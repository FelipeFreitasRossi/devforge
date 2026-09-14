"""
Script para redefinir a senha de um usuário.
Uso: python reset_password.py email@exemplo.com nova_senha
"""
import sys
from app.database import users_collection
from app.auth import hash_password

if len(sys.argv) != 3:
    print("Uso: python reset_password.py email@exemplo.com nova_senha")
    sys.exit(1)

email = sys.argv[1]
new_password = sys.argv[2]

user = users_collection.find_one({"email": email})

if not user:
    print(f"❌ Usuário não encontrado: {email}")
    sys.exit(1)

new_hash = hash_password(new_password)

users_collection.update_one(
    {"email": email},
    {"$set": {"password_hash": new_hash}},
)

print(f"✅ Senha redefinida para: {email}")
print(f"   Nova senha: {new_password}")
print(f"\n   Agora faça login com essas credenciais.")