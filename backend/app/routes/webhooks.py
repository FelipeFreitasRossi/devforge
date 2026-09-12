from fastapi import APIRouter, Request

router = APIRouter()

@router.post("/mercadopago")
async def mercadopago_webhook(request: Request):
    """
    Recebe notificações do Mercado Pago.
    Em produção, valide a assinatura com o secret do MP.
    """
    body = await request.json()
    print(f"Webhook recebido: {body}")

    # O frontend faz polling em /api/payments/status/{order_id}
    # para confirmar o pagamento, então aqui só logamos
    return {"status": "ok"}