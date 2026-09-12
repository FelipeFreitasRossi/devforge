import os
import uuid
import httpx
from datetime import datetime, timedelta
from typing import Optional

MP_ACCESS_TOKEN = os.getenv("MP_ACCESS_TOKEN")
MP_API_URL = "https://api.mercadopago.com/v1/orders"


def _is_test_credentials() -> bool:
    """Verifica se está usando credenciais de teste."""
    return MP_ACCESS_TOKEN and MP_ACCESS_TOKEN.startswith("TEST-")


def _get_payer_email(user: dict) -> str:
    """Retorna o e-mail correto do pagador conforme o ambiente."""
    if _is_test_credentials():
        return "test_user_br@testuser.com"
    return user["email"]


async def create_payment_order(user: dict, method: str) -> dict:
    """
    Cria uma order no Mercado Pago para o método escolhido.
    
    Métodos suportados:
    - pix: QR Code Pix (APENAS produção)
    - boleto: Boleto bancário (APENAS produção)
    """
    method_map = {
        "pix": {"id": "pix", "type": "bank_transfer"},
        "boleto": {"id": "boleto", "type": "ticket"},
    }

    if method not in method_map:
        return {
            "status_code": 400,
            "data": {"error": f"Método '{method}' não suportado nesta função"},
        }

    payload = {
        "type": "online",
        "external_reference": str(user["_id"]),
        "total_amount": "19.99",
        "processing_mode": "automatic",
        "transactions": {
            "payments": [
                {
                    "amount": "19.99",
                    "payment_method": method_map[method],
                    "expiration_time": "PT1H",
                }
            ]
        },
        "payer": {
            "email": _get_payer_email(user),
            "first_name": "APRO" if _is_test_credentials() else user.get("name", "Cliente"),
        },
    }

    headers = {
        "Authorization": f"Bearer {MP_ACCESS_TOKEN}",
        "Content-Type": "application/json",
        "X-Idempotency-Key": str(uuid.uuid4()),
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(MP_API_URL, json=payload, headers=headers)

        data = response.json()

        # Log estruturado
        print(f"[MP] {method.upper()} | Status: {response.status_code} | Order: {data.get('id', 'N/A')}")

        return {"status_code": response.status_code, "data": data}

    except httpx.TimeoutException:
        return {
            "status_code": 504,
            "data": {"error": "Timeout ao conectar com Mercado Pago"},
        }
    except Exception as e:
        return {
            "status_code": 500,
            "data": {"error": f"Erro inesperado: {str(e)}"},
        }


async def create_card_order(
    user: dict, token: str, payment_method_id: str, installments: int
) -> dict:
    """Cria uma order de pagamento com cartão no Mercado Pago."""
    payload = {
        "type": "online",
        "external_reference": str(user["_id"]),
        "total_amount": "19.99",
        "processing_mode": "automatic",
        "transactions": {
            "payments": [
                {
                    "amount": "19.99",
                    "payment_method": {
                        "id": payment_method_id,
                        "type": "credit_card",
                        "token": token,
                        "installments": installments,
                    },
                }
            ]
        },
        "payer": {
            "email": _get_payer_email(user),
        },
    }

    headers = {
        "Authorization": f"Bearer {MP_ACCESS_TOKEN}",
        "Content-Type": "application/json",
        "X-Idempotency-Key": str(uuid.uuid4()),
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(MP_API_URL, json=payload, headers=headers)

        data = response.json()
        print(f"[MP] CARD | Status: {response.status_code} | Order: {data.get('id', 'N/A')}")

        return {"status_code": response.status_code, "data": data}

    except httpx.TimeoutException:
        return {
            "status_code": 504,
            "data": {"error": "Timeout ao conectar com Mercado Pago"},
        }
    except Exception as e:
        return {
            "status_code": 500,
            "data": {"error": f"Erro inesperado: {str(e)}"},
        }


async def get_order(order_id: str) -> dict:
    """Consulta o status de uma order no Mercado Pago."""
    headers = {"Authorization": f"Bearer {MP_ACCESS_TOKEN}"}

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(f"{MP_API_URL}/{order_id}", headers=headers)

        return {"status_code": response.status_code, "data": response.json()}

    except Exception as e:
        return {
            "status_code": 500,
            "data": {"error": f"Erro ao consultar order: {str(e)}"},
        }