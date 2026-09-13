from datetime import datetime, timedelta
from app.database import (
    progress_collection,
    achievements_collection,
    daily_activity_collection,
)

# Definição da trilha (módulos e aulas)
CURRICULUM = [
    {
        "id": "01",
        "title": "Fundamentos da Programação",
        "description": "Lógica, algoritmos e primeiros passos",
        "duration_hours": 4,
        "lessons": [
            {"id": "01-01", "title": "Introdução à lógica", "duration": 10},
            {"id": "01-02", "title": "Algoritmos básicos", "duration": 15},
            {"id": "01-03", "title": "Git e GitHub", "duration": 20},
            {"id": "01-04", "title": "Variáveis e Tipos de Dados", "duration": 12},
            {"id": "01-05", "title": "Operadores", "duration": 14},
        ],
    },
    {
        "id": "02",
        "title": "Python do Zero ao Avançado",
        "description": "Sintaxe, POO, APIs e testes",
        "duration_hours": 8,
        "lessons": [
            {"id": "02-01", "title": "Sintaxe básica", "duration": 18},
            {"id": "02-02", "title": "Estruturas de dados", "duration": 22},
            {"id": "02-03", "title": "Funções", "duration": 16},
            {"id": "02-04", "title": "POO", "duration": 25},
            {"id": "02-05", "title": "APIs", "duration": 20},
        ],
    },
    {
        "id": "03",
        "title": "Frontend Moderno",
        "description": "HTML, CSS, JavaScript e React",
        "duration_hours": 12,
        "lessons": [
            {"id": "03-01", "title": "HTML semântico", "duration": 15},
            {"id": "03-02", "title": "CSS moderno", "duration": 20},
            {"id": "03-03", "title": "JavaScript essencial", "duration": 25},
            {"id": "03-04", "title": "React fundamentos", "duration": 30},
        ],
    },
    {
        "id": "04",
        "title": "Backend Profissional",
        "description": "FastAPI, MongoDB, autenticação e deploy",
        "duration_hours": 10,
        "lessons": [
            {"id": "04-01", "title": "FastAPI do zero", "duration": 22},
            {"id": "04-02", "title": "MongoDB", "duration": 18},
            {"id": "04-03", "title": "Autenticação JWT", "duration": 20},
            {"id": "04-04", "title": "Deploy", "duration": 15},
        ],
    },
]

# Catálogo de conquistas
ACHIEVEMENTS_CATALOG = [
    {
        "id": "first_lesson",
        "title": "Primeiro passo",
        "description": "Complete a primeira aula",
        "accent": "brand",
    },
    {
        "id": "streak_3",
        "title": "Streak de 3 dias",
        "description": "Estude 3 dias seguidos",
        "accent": "brand",
    },
    {
        "id": "streak_7",
        "title": "Semana completa",
        "description": "Estude 7 dias seguidos",
        "accent": "accent",
    },
    {
        "id": "module_complete",
        "title": "Módulo completo",
        "description": "Conclua um módulo inteiro",
        "accent": "accent",
    },
    {
        "id": "10_hours",
        "title": "Dev dedicado",
        "description": "Estude 10h no total",
        "accent": "brand",
    },
    {
        "id": "all_modules",
        "title": "Devstack master",
        "description": "Conclua todos os módulos",
        "accent": "accent",
    },
]


def calculate_streak(user_id: str) -> dict:
    """Calcula dias consecutivos de estudo."""
    activities = list(
        daily_activity_collection.find({"user_id": user_id}).sort("date", -1)
    )

    if not activities:
        return {"current_days": 0, "longest_days": 0, "last_study_date": None}

    dates = sorted({a["date"] for a in activities}, reverse=True)
    today = datetime.utcnow().date()
    yesterday = today - timedelta(days=1)

    current_streak = 0
    last_date = datetime.strptime(dates[0], "%Y-%m-%d").date()

    if last_date in (today, yesterday):
        current_streak = 1
        check_date = last_date
        for d in dates[1:]:
            parsed = datetime.strptime(d, "%Y-%m-%d").date()
            if (check_date - parsed).days == 1:
                current_streak += 1
                check_date = parsed
            else:
                break

    # Maior streak
    longest = 0
    temp = 0
    prev = None
    for d in sorted(dates):
        parsed = datetime.strptime(d, "%Y-%m-%d").date()
        if prev and (parsed - prev).days == 1:
            temp += 1
        else:
            temp = 1
        longest = max(longest, temp)
        prev = parsed

    return {
        "current_days": current_streak,
        "longest_days": longest,
        "last_study_date": dates[0],
    }


def calculate_total_hours(user_id: str) -> float:
    """Soma total de horas estudadas."""
    pipeline = [
        {"$match": {"user_id": user_id}},
        {"$group": {"_id": None, "total": {"$sum": "$minutes_studied"}}},
    ]
    result = list(daily_activity_collection.aggregate(pipeline))
    if not result:
        return 0.0
    return round(result[0]["total"] / 60, 1)


def calculate_module_progress(user_id: str, module: dict) -> dict:
    """Calcula progresso do aluno em um módulo."""
    module_id = module["id"]
    total = len(module["lessons"])

    completed = progress_collection.count_documents({
        "user_id": user_id,
        "module_id": module_id,
        "completed": True,
    })

    percent = round((completed / total) * 100) if total > 0 else 0

    if completed == 0 and module_id != "01":
        status = "locked"
    elif completed == total:
        status = "completed"
    else:
        status = "in_progress"

    # Módulo 01 sempre acessível
    if module_id == "01" and status == "locked":
        status = "in_progress"

    return {
        "id": module_id,
        "title": module["title"],
        "description": module["description"],
        "lessons_count": total,
        "completed_lessons": completed,
        "status": status,
        "duration_hours": module["duration_hours"],
        "progress_percent": percent,
    }


def get_next_lesson(user_id: str) -> dict | None:
    """Retorna a próxima aula não concluída."""
    for module in CURRICULUM:
        for lesson in module["lessons"]:
            done = progress_collection.find_one({
                "user_id": user_id,
                "lesson_id": lesson["id"],
                "completed": True,
            })
            if not done:
                module_progress = calculate_module_progress(user_id, module)
                return {
                    "module_id": module["id"],
                    "module_title": module["title"],
                    "lesson_id": lesson["id"],
                    "lesson_title": lesson["title"],
                    "duration_minutes": lesson["duration"],
                    "progress_percent": module_progress["progress_percent"],
                }
    return None


def get_weekly_goal_progress(user_id: str, goal: int = 5) -> str:
    """Progresso da meta semanal (aulas por semana)."""
    today = datetime.utcnow().date()
    week_start = today - timedelta(days=today.weekday())

    count = progress_collection.count_documents({
        "user_id": user_id,
        "completed": True,
        "completed_at": {"$gte": datetime.combine(week_start, datetime.min.time())},
    })

    return f"{min(count, goal)}/{goal}"


def check_achievements(user_id: str) -> list[str]:
    """Verifica e desbloqueia novas conquistas."""
    unlocked_ids = {
        a["achievement_id"]
        for a in achievements_collection.find({"user_id": user_id})
    }

    new_unlocked = []

    # Total de aulas concluídas
    total_done = progress_collection.count_documents({
        "user_id": user_id,
        "completed": True,
    })

    # Streak
    streak = calculate_streak(user_id)

    # Horas totais
    hours = calculate_total_hours(user_id)

    # Módulos completos
    modules_complete = 0
    for module in CURRICULUM:
        prog = calculate_module_progress(user_id, module)
        if prog["status"] == "completed":
            modules_complete += 1

    # Verifica cada conquista
    candidates = {
        "first_lesson": total_done >= 1,
        "streak_3": streak["current_days"] >= 3,
        "streak_7": streak["current_days"] >= 7,
        "module_complete": modules_complete >= 1,
        "10_hours": hours >= 10,
        "all_modules": modules_complete == len(CURRICULUM),
    }

    for achievement_id, condition in candidates.items():
        if condition and achievement_id not in unlocked_ids:
            achievements_collection.insert_one({
                "user_id": user_id,
                "achievement_id": achievement_id,
                "unlocked_at": datetime.utcnow(),
            })
            new_unlocked.append(achievement_id)

    return new_unlocked


def get_all_achievements(user_id: str) -> list[dict]:
    """Retorna todas as conquistas com status."""
    unlocked_ids = {
        a["achievement_id"]
        for a in achievements_collection.find({"user_id": user_id})
    }

    result = []
    for ach in ACHIEVEMENTS_CATALOG:
        result.append({
            "id": ach["id"],
            "title": ach["title"],
            "description": ach["description"],
            "accent": ach["accent"],
            "unlocked": ach["id"] in unlocked_ids,
        })
    return result


def get_all_modules_with_progress(user_id: str) -> list[dict]:
    """Retorna todos os módulos com progresso do aluno."""
    return [calculate_module_progress(user_id, m) for m in CURRICULUM]