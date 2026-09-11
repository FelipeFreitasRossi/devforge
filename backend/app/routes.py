from fastapi import APIRouter

router = APIRouter()

@router.get("/courses")
async def list_courses():
    return [
        {"id": 1, "title": "Python do Zero", "price": 0},
        {"id": 2, "title": "React Avançado", "price": 97},
    ]