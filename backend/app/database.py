import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"))
database = client[os.getenv("DB_NAME", "curso_saas")]

users_collection = database["users"]
courses_collection = database["courses"]
orders_collection = database["orders"]