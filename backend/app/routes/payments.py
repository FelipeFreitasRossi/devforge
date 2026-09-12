from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from datetime import datetime
from app.auth import get_current_user
from app.database import users_collection, orders_collection
from app.mercadopago import create_payment_order, create_card_order, get_order

router = APIRouter()


class PaymentRequest(BaseModel):
    method: str


class CardPaymentRequest(BaseModel):
    token: str
    payment_method_id: str
    installments: int


def _extract_error_detail(result: dict) -> str:
    """Extrai mensagem de erro amigável da resposta do Mercado Pago."""
    data = result.get("data", {})
    
    # Erro interno do MP (sandbox)
    if data.get("status_detail") == "processing_error":
        return (
            "Este método de pagamento não está disponível no ambiente de teste. "
            "Para testar Pix e Boleto, use as credenciais de produção. "
            "O cartão funciona normalmente em testes."
        )
    
    # Erros estruturados da API
    errors = data.get("errors", [])
    if errors and isinstance(errors, list):
        messages = [e.get("message", "") for e in errors]
        return " | ".join(messages)
    
    # Erro genérico
    return data.get("message") or data.get("error") or "Erro ao processar pagamento"


@router.post("/create")
async def create_payment(data: PaymentRequest, user=Depends(get_current_user)):
    if user.get("paid"):
        raise HTTPException(status_code=400, detail="Pagamento já realizado")

    if data.method not in ["pix", "boleto"]:
        raise HTTPException(status_code=400, detail="Método inválido")

    result = await create_payment_order(user, data.method)

    if result["status_code"] not in (200, 201):
        raise HTTPException(
            status_code=result["status_code"],
            detail=_extract_error_detail(result),
        )

    order = result["data"]
    order_id = order.get("id")
    payment = order.get("transactions", {}).get("payments", [{}])[0]
    payment_method = payment.get("payment_method", {})

    users_collection.update_one(
        {"_id": user["_id"]},
        {"$set": {"pending_order_id": order_id}},
    )

    orders_collection.insert_one({
        "user_id": user["_id"],
        "order_id": order_id,
        "amount": 19.99,
        "method": data.method,
        "status": "pending",
        "created_at": datetime.utcnow(),
    })

    response = {"order_id": order_id, "method": data.method}

    if data.method == "pix":
        response.update({
            "qr_code": payment_method.get("qr_code"),
            "qr_code_base64": payment_method.get("qr_code_base64"),
            "ticket_url": payment_method.get("ticket_url"),
        })
    elif data.method == "boleto":
        response.update({
            "ticket_url": payment_method.get("ticket_url"),
            "barcode": payment_method.get("barcode"),
        })

    return response


@router.post("/create-card")
async def create_card_payment(
    data: CardPaymentRequest, user=Depends(get_current_user)
):
    if user.get("paid"):
        raise HTTPException(status_code=400, detail="Pagamento já realizado")

    result = await create_card_order(
        user, data.token, data.payment_method_id, data.installments
    )

    if result["status_code"] not in (200, 201):
        raise HTTPException(
            status_code=result["status_code"],
            detail=_extract_error_detail(result),
        )

    order = result["data"]
    status = order.get("status")
    is_paid = status in ("processed", "approved")

    if is_paid:
        users_collection.update_one(
            {"_id": user["_id"]},
            {"$set": {"paid": True, "paid_at": datetime.utcnow()}},
        )
        orders_collection.insert_one({
            "user_id": user["_id"],
            "order_id": order.get("id"),
            "amount": 19.99,
            "method": "credit_card",
            "status": "approved",
            "created_at": datetime.utcnow(),
        })

    return {
        "order_id": order.get("id"),
        "status": status,
        "paid": is_paid,
    }


@router.get("/status/{order_id}")
async def check_status(order_id: str, user=Depends(get_current_user)):
    result = await get_order(order_id)

    if result["status_code"] != 200:
        raise HTTPException(status_code=400, detail="Order não encontrada")

    order = result["data"]
    status_value = order.get("status", "pending")
    is_paid = status_value in ("processed", "approved")

    if is_paid and not user.get("paid"):
        users_collection.update_one(
            {"_id": user["_id"]},
            {"$set": {"paid": True, "paid_at": datetime.utcnow()}},
        )
        orders_collection.update_one(
            {"order_id": order_id},
            {"$set": {"status": "approved", "paid_at": datetime.utcnow()}},
        )

    return {"status": status_value, "paid": is_paid}