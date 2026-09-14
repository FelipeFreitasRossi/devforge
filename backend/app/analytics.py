from datetime import datetime, timedelta
from app.database import (
    progress_collection,
    achievements_collection,
    daily_activity_collection,
)

CURRICULUM = [
    {
    "id": "01",
    "title": "Lógica de Programação",
    "description": "O básico antes de programar: pensar como um dev",
    "duration_hours": 8,
    "lessons": [
        {"id": "01-01", "title": "Fundamentos da Programação", "reading_time_minutes": 29, "has_exercise": True},
        {"id": "01-03", "title": "Variáveis e Constantes", "reading_time_minutes": 12, "has_exercise": True},
        {"id": "01-04", "title": "Tipos de Dados", "reading_time_minutes": 12, "has_exercise": True},
        {"id": "01-05", "title": "Operadores Aritméticos", "reading_time_minutes": 10, "has_exercise": True},
        {"id": "01-06", "title": "Operadores Lógicos e Relacionais", "reading_time_minutes": 12, "has_exercise": True},
        {"id": "01-07", "title": "Estruturas Condicionais (if/else)", "reading_time_minutes": 14, "has_exercise": True},
        {"id": "01-08", "title": "Estruturas de Repetição (for/while)", "reading_time_minutes": 15, "has_exercise": True},
        {"id": "01-09", "title": "Listas", "reading_time_minutes": 12, "has_exercise": True},
        {"id": "01-10", "title": "Dicionários", "reading_time_minutes": 12, "has_exercise": True},
        {"id": "01-11", "title": "Funções", "reading_time_minutes": 14, "has_exercise": True},
        {"id": "01-12", "title": "Projeto: Calculadora", "reading_time_minutes": 20, "has_exercise": True},
    ],
    },
    {   
        "id": "02",
        "title": "Python Fundamentos",
        "description": "Sintaxe, entrada/saída e estruturas básicas",
        "duration_hours": 10,
        "lessons": [
            {"id": "02-01", "title": "Instalando Python e o VSCode", "reading_time_minutes": 10, "has_exercise": False},
            {"id": "02-02", "title": "Primeiro programa: print()", "reading_time_minutes": 8, "has_exercise": True},
            {"id": "02-03", "title": "Variáveis e tipos em Python", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "02-04", "title": "Entrada de dados: input()", "reading_time_minutes": 10, "has_exercise": True},
            {"id": "02-05", "title": "Conversão de tipos (int, float, str)", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "02-06", "title": "Strings: métodos principais", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "02-07", "title": "Listas, tuplas e sets", "reading_time_minutes": 15, "has_exercise": True},
            {"id": "02-08", "title": "Dicionários em Python", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "02-09", "title": "Condicionais em Python", "reading_time_minutes": 10, "has_exercise": True},
            {"id": "02-10", "title": "Loops em Python", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "02-11", "title": "Projeto: Sistema de cadastro", "reading_time_minutes": 25, "has_exercise": True},
        ],
    },
    {
        "id": "03",
        "title": "Python Intermediário",
        "description": "Funções avançadas, POO, módulos e arquivos",
        "duration_hours": 12,
        "lessons": [
            {"id": "03-01", "title": "Funções com parâmetros e retorno", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "03-02", "title": "Argumentos opcionais e nomeados", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "03-03", "title": "*args e **kwargs", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "03-04", "title": "Funções lambda", "reading_time_minutes": 10, "has_exercise": True},
            {"id": "03-05", "title": "List comprehensions", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "03-06", "title": "Tratamento de erros (try/except)", "reading_time_minutes": 15, "has_exercise": True},
            {"id": "03-07", "title": "Módulos, pacotes e pip", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "03-08", "title": "Ambientes virtuais (venv)", "reading_time_minutes": 10, "has_exercise": False},
            {"id": "03-09", "title": "Manipulação de arquivos e JSON", "reading_time_minutes": 15, "has_exercise": True},
            {"id": "03-10", "title": "Programação Orientada a Objetos (POO)", "reading_time_minutes": 18, "has_exercise": True},
        ],
    },
    {
        "id": "04",
        "title": "Python para Desenvolvimento",
        "description": "HTTP, APIs, autenticação e banco de dados",
        "duration_hours": 8,
        "lessons": [
            {"id": "04-01", "title": "HTTP e APIs REST", "reading_time_minutes": 12, "has_exercise": False},
            {"id": "04-02", "title": "Biblioteca requests", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "04-03", "title": "Trabalhando com JSON", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "04-04", "title": "Autenticação básica", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "04-05", "title": "Variáveis de ambiente", "reading_time_minutes": 10, "has_exercise": False},
            {"id": "04-06", "title": "Introdução a banco de dados", "reading_time_minutes": 14, "has_exercise": False},
            {"id": "04-07", "title": "CRUD — Create, Read, Update, Delete", "reading_time_minutes": 16, "has_exercise": True},
        ],
    },
    {
        "id": "05",
        "title": "FastAPI",
        "description": "Criando APIs profissionais com Python",
        "duration_hours": 10,
        "lessons": [
            {"id": "05-01", "title": "Introdução ao FastAPI", "reading_time_minutes": 12, "has_exercise": False},
            {"id": "05-02", "title": "Rotas GET e POST", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "05-03", "title": "Rotas PUT e DELETE", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "05-04", "title": "Validação com Pydantic", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "05-05", "title": "Middleware e CORS", "reading_time_minutes": 12, "has_exercise": False},
            {"id": "05-06", "title": "Autenticação com JWT", "reading_time_minutes": 18, "has_exercise": True},
            {"id": "05-07", "title": "Integração com banco de dados", "reading_time_minutes": 16, "has_exercise": True},
            {"id": "05-08", "title": "Documentação automática (Swagger)", "reading_time_minutes": 10, "has_exercise": False},
        ],
    },
    {
        "id": "06",
        "title": "HTML + CSS",
        "description": "Estrutura e estilo das páginas web",
        "duration_hours": 14,
        "lessons": [
            {"id": "06-01", "title": "Estrutura HTML", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "06-02", "title": "Tags principais e textos", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "06-03", "title": "Links, imagens e listas", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "06-04", "title": "Tabelas e formulários", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "06-05", "title": "HTML semântico", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "06-06", "title": "Acessibilidade", "reading_time_minutes": 10, "has_exercise": False},
            {"id": "06-07", "title": "CSS: seletores e box model", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "06-08", "title": "Flexbox", "reading_time_minutes": 16, "has_exercise": True},
            {"id": "06-09", "title": "Grid", "reading_time_minutes": 16, "has_exercise": True},
            {"id": "06-10", "title": "Cores, tipografia e sombras", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "06-11", "title": "Gradientes e transições", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "06-12", "title": "Animações CSS", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "06-13", "title": "Responsividade e media queries", "reading_time_minutes": 16, "has_exercise": True},
            {"id": "06-14", "title": "Projeto: Landing Page", "reading_time_minutes": 30, "has_exercise": True},
        ],
    },
    {
        "id": "07",
        "title": "JavaScript",
        "description": "A linguagem da web, do básico ao assíncrono",
        "duration_hours": 16,
        "lessons": [
            {"id": "07-01", "title": "Variáveis e tipos", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "07-02", "title": "Operadores e condicionais", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "07-03", "title": "Loops", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "07-04", "title": "Funções", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "07-05", "title": "Arrays e objetos", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "07-06", "title": "DOM — manipulando elementos", "reading_time_minutes": 16, "has_exercise": True},
            {"id": "07-07", "title": "Eventos e addEventListener", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "07-08", "title": "Formulários e validação", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "07-09", "title": "ES6+ — Arrow functions, destructuring, spread", "reading_time_minutes": 16, "has_exercise": True},
            {"id": "07-10", "title": "map, filter, reduce, find", "reading_time_minutes": 16, "has_exercise": True},
            {"id": "07-11", "title": "Promises e async/await", "reading_time_minutes": 18, "has_exercise": True},
            {"id": "07-12", "title": "fetch e consumo de APIs", "reading_time_minutes": 16, "has_exercise": True},
            {"id": "07-13", "title": "LocalStorage e SessionStorage", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "07-14", "title": "Projeto: To-do List", "reading_time_minutes": 30, "has_exercise": True},
        ],
    },
    {
        "id": "08",
        "title": "TypeScript",
        "description": "JavaScript com tipos, do básico ao avançado",
        "duration_hours": 8,
        "lessons": [
            {"id": "08-01", "title": "Por que TypeScript?", "reading_time_minutes": 10, "has_exercise": False},
            {"id": "08-02", "title": "Tipos primitivos e anotações", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "08-03", "title": "Interfaces e type aliases", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "08-04", "title": "Union types e literal types", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "08-05", "title": "Generics", "reading_time_minutes": 16, "has_exercise": True},
            {"id": "08-06", "title": "Enums", "reading_time_minutes": 10, "has_exercise": True},
            {"id": "08-07", "title": "Tipagem de funções e objetos", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "08-08", "title": "unknown, any e por que evitar", "reading_time_minutes": 12, "has_exercise": False},
            {"id": "08-09", "title": "Utility Types", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "08-10", "title": "Projeto: Refatorando JS para TS", "reading_time_minutes": 20, "has_exercise": True},
        ],
    },
    {
        "id": "09",
        "title": "React",
        "description": "Construindo interfaces modernas com React + TypeScript",
        "duration_hours": 18,
        "lessons": [
            {"id": "09-01", "title": "Introdução ao React e Vite", "reading_time_minutes": 12, "has_exercise": False},
            {"id": "09-02", "title": "Componentes e JSX/TSX", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "09-03", "title": "Props", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "09-04", "title": "State com useState", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "09-05", "title": "Eventos e formulários", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "09-06", "title": "Renderização condicional e listas", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "09-07", "title": "useEffect", "reading_time_minutes": 16, "has_exercise": True},
            {"id": "09-08", "title": "useMemo e useCallback", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "09-09", "title": "useRef e hooks personalizados", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "09-10", "title": "Organização de pastas e arquitetura", "reading_time_minutes": 12, "has_exercise": False},
            {"id": "09-11", "title": "React Router — rotas e protegidas", "reading_time_minutes": 16, "has_exercise": True},
            {"id": "09-12", "title": "Consumindo APIs", "reading_time_minutes": 16, "has_exercise": True},
            {"id": "09-13", "title": "Context API", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "09-14", "title": "Projeto: Dashboard", "reading_time_minutes": 30, "has_exercise": True},
        ],
    },
    {
        "id": "10",
        "title": "MongoDB",
        "description": "Banco de dados NoSQL, do conceito ao uso real",
        "duration_hours": 8,
        "lessons": [
            {"id": "10-01", "title": "SQL vs NoSQL", "reading_time_minutes": 10, "has_exercise": False},
            {"id": "10-02", "title": "Database, Collection, Document", "reading_time_minutes": 12, "has_exercise": False},
            {"id": "10-03", "title": "CRUD — Create, Read, Update, Delete", "reading_time_minutes": 16, "has_exercise": True},
            {"id": "10-04", "title": "Queries, filtros e operadores", "reading_time_minutes": 14, "has_exercise": True},
            {"id": "10-05", "title": "Arrays e objetos aninhados", "reading_time_minutes": 12, "has_exercise": True},
            {"id": "10-06", "title": "Índices e performance", "reading_time_minutes": 12, "has_exercise": False},
            {"id": "10-07", "title": "Aggregation", "reading_time_minutes": 16, "has_exercise": True},
            {"id": "10-08", "title": "MongoDB + Python (PyMongo)", "reading_time_minutes": 18, "has_exercise": True},
        ],
    },
    {
        "id": "11",
        "title": "Full Stack — Integração",
        "description": "React + FastAPI + MongoDB na prática",
        "duration_hours": 6,
        "lessons": [
            {"id": "11-01", "title": "Arquitetura React → FastAPI → MongoDB", "reading_time_minutes": 14, "has_exercise": False},
            {"id": "11-02", "title": "Autenticação completa com JWT", "reading_time_minutes": 20, "has_exercise": True},
            {"id": "11-03", "title": "CRUD completo integrado", "reading_time_minutes": 22, "has_exercise": True},
            {"id": "11-04", "title": "Projeto final: SaaS completo", "reading_time_minutes": 30, "has_exercise": True},
        ],
    },
    {
        "id": "12",
        "title": "Deploy",
        "description": "Colocando o projeto no ar gratuitamente",
        "duration_hours": 4,
        "lessons": [
            {"id": "12-01", "title": "Git e GitHub essenciais", "reading_time_minutes": 14, "has_exercise": False},
            {"id": "12-02", "title": "Deploy do frontend (Vercel)", "reading_time_minutes": 12, "has_exercise": False},
            {"id": "12-03", "title": "Deploy do backend (Render/Railway)", "reading_time_minutes": 12, "has_exercise": False},
            {"id": "12-04", "title": "MongoDB Atlas em produção", "reading_time_minutes": 10, "has_exercise": False},
        ],
    },
]

ACHIEVEMENTS_CATALOG = [
    {"id": "first_lesson", "title": "Primeiro passo", "description": "Complete a primeira aula", "accent": "brand"},
    {"id": "streak_3", "title": "Streak de 3 dias", "description": "Estude 3 dias seguidos", "accent": "brand"},
    {"id": "streak_7", "title": "Semana completa", "description": "Estude 7 dias seguidos", "accent": "accent"},
    {"id": "module_complete", "title": "Módulo completo", "description": "Conclua um módulo inteiro", "accent": "accent"},
    {"id": "10_hours", "title": "Dev dedicado", "description": "Estude 10h no total", "accent": "brand"},
    {"id": "all_modules", "title": "Devstack master", "description": "Conclua todos os módulos", "accent": "accent"},
]


def calculate_streak(user_id: str) -> dict:
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
    pipeline = [
        {"$match": {"user_id": user_id}},
        {"$group": {"_id": None, "total": {"$sum": "$minutes_studied"}}},
    ]
    result = list(daily_activity_collection.aggregate(pipeline))
    if not result:
        return 0.0
    return round(result[0]["total"] / 60, 1)


def calculate_module_progress(user_id: str, module: dict) -> dict:
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
                    "reading_time_minutes": lesson["reading_time_minutes"],
                    "has_exercise": lesson["has_exercise"],
                    "progress_percent": module_progress["progress_percent"],
                }
    return None


def get_weekly_goal_progress(user_id: str, goal: int = 5) -> str:
    today = datetime.utcnow().date()
    week_start = today - timedelta(days=today.weekday())

    count = progress_collection.count_documents({
        "user_id": user_id,
        "completed": True,
        "completed_at": {"$gte": datetime.combine(week_start, datetime.min.time())},
    })

    return f"{min(count, goal)}/{goal}"


def check_achievements(user_id: str) -> list[str]:
    unlocked_ids = {
        a["achievement_id"]
        for a in achievements_collection.find({"user_id": user_id})
    }

    new_unlocked = []
    total_done = progress_collection.count_documents({
        "user_id": user_id,
        "completed": True,
    })
    streak = calculate_streak(user_id)
    hours = calculate_total_hours(user_id)

    modules_complete = 0
    for module in CURRICULUM:
        prog = calculate_module_progress(user_id, module)
        if prog["status"] == "completed":
            modules_complete += 1

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
    return [calculate_module_progress(user_id, m) for m in CURRICULUM]


def get_weekly_activity(user_id: str) -> list[dict]:
    today = datetime.utcnow().date()
    result = []

    for i in range(6, -1, -1):
        day = today - timedelta(days=i)
        date_str = day.strftime("%Y-%m-%d")

        activity = daily_activity_collection.find_one({
            "user_id": user_id,
            "date": date_str,
        })

        result.append({
            "date": date_str,
            "weekday": ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"][
                day.weekday()
            ],
            "minutes": activity["minutes_studied"] if activity else 0,
        })

    return result


def get_time_distribution(user_id: str) -> list[dict]:
    """Retorna o tempo total de estudo por módulo."""
    pipeline = [
        {"$match": {"user_id": user_id}},
        {
            "$group": {
                "_id": "$module_id",
                "minutes": {"$sum": "$time_spent_minutes"},
            }
        },
    ]
    result = list(progress_collection.aggregate(pipeline))
    minutes_by_module = {r["_id"]: r["minutes"] for r in result}

    distribution = []
    for module in CURRICULUM:
        minutes = minutes_by_module.get(module["id"], 0)
        if minutes > 0:
            distribution.append({
                "module_id": module["id"],
                "module_title": module["title"],
                "minutes": minutes,
            })

    distribution.sort(key=lambda x: x["minutes"], reverse=True)
    return distribution


def get_timeline(user_id: str, limit: int = 10) -> list[dict]:
    """Retorna as últimas aulas concluídas (mais recentes primeiro)."""
    entries = list(
        progress_collection.find({
            "user_id": user_id,
            "completed": True,
        })
        .sort("completed_at", -1)
        .limit(limit)
    )

    lesson_lookup = {}
    for module in CURRICULUM:
        for lesson in module["lessons"]:
            lesson_lookup[lesson["id"]] = {
                "lesson_title": lesson["title"],
                "module_title": module["title"],
            }

    result = []
    for entry in entries:
        lesson_id = entry["lesson_id"]
        info = lesson_lookup.get(lesson_id, {})
        completed_at = entry.get("completed_at")

        result.append({
            "id": str(entry["_id"]),
            "lesson_id": lesson_id,
            "lesson_title": info.get("lesson_title", "Lição"),
            "module_title": info.get("module_title", ""),
            "date": (
                completed_at.isoformat()
                if completed_at
                else datetime.utcnow().isoformat()
            ),
        })

    return result


def get_lesson_sidebar(user_id: str, current_lesson_id: str) -> list[dict]:
    """Monta a árvore módulo > lição com o status de cada uma."""
    completed_lesson_ids = {
        p["lesson_id"]
        for p in progress_collection.find({"user_id": user_id, "completed": True})
    }

    sidebar = []
    previous_module_completed = True

    for module in CURRICULUM:
        module_unlocked = module["id"] == "01" or previous_module_completed
        lessons_out = []

        for lesson in module["lessons"]:
            if lesson["id"] == current_lesson_id:
                status = "current"
            elif lesson["id"] in completed_lesson_ids:
                status = "completed"
            elif not module_unlocked:
                status = "locked"
            else:
                status = "pending"

            lessons_out.append({
                "id": lesson["id"],
                "title": lesson["title"],
                "reading_time_minutes": lesson["reading_time_minutes"],
                "has_exercise": lesson["has_exercise"],
                "status": status,
            })

        module_completed_now = all(
            l["id"] in completed_lesson_ids for l in module["lessons"]
        )

        sidebar.append({
            "id": module["id"],
            "title": module["title"],
            "unlocked": module_unlocked,
            "lessons": lessons_out,
        })

        previous_module_completed = module_completed_now

    return sidebar