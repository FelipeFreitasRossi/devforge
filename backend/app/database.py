import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"))
db = client[os.getenv("DB_NAME", "curso_saas")]

# ============ COLEÇÕES EXISTENTES ============
users_collection = db["users"]
courses_collection = db["courses"]
orders_collection = db["orders"]

# ============ COLEÇÕES DO DASHBOARD ============
progress_collection = db["progress"]
achievements_collection = db["achievements"]
daily_activity_collection = db["daily_activity"]

# ============ COLEÇÃO DE LIÇÕES (NOVO) ============
lesson_submissions_collection = db["lesson_submissions"]

# ============ ÍNDICES (rodam uma vez) ============
try:
    progress_collection.create_index([("user_id", 1), ("module_id", 1)])
    daily_activity_collection.create_index(
        [("user_id", 1), ("date", 1)], unique=True
    )
    achievements_collection.create_index(
        [("user_id", 1), ("achievement_id", 1)], unique=True
    )
    lesson_submissions_collection.create_index(
        [("user_id", 1), ("lesson_id", 1)]
    )
except Exception as e:
    print(f"Aviso ao criar índices: {e}")