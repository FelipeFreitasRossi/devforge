
LESSON_TITLES = {
    "01-01": "Introdução à Lógica de Programação",
    "01-02": "Algoritmos e Fluxogramas",
    "01-03": "Instalando o Ambiente",
    "01-04": "Variáveis e Tipos de Dados",
    "01-05": "Estruturas Condicionais",
}

MODULES = [
    {
        "id": "01",
        "title": "Fundamentos da Programação",
        "description": "Lógica, algoritmos e primeiros passos",
        "lessons_count": 12,
        "duration_hours": 4,
    },
    {
        "id": "02",
        "title": "Python do Zero ao Avançado",
        "description": "Sintaxe, POO, APIs e testes",
        "lessons_count": 18,
        "duration_hours": 8,
    },
    {
        "id": "03",
        "title": "Frontend Moderno",
        "description": "HTML, CSS, JavaScript e React",
        "lessons_count": 22,
        "duration_hours": 12,
    },
    {
        "id": "04",
        "title": "Backend Profissional",
        "description": "FastAPI, MongoDB, autenticação e deploy",
        "lessons_count": 16,
        "duration_hours": 10,
    },
]


def get_lesson_title(module_id: str, lesson_number: int) -> str:
    """Devolve o título de uma aula. Se não tiver um nome definido em
    LESSON_TITLES, devolve algo genérico tipo 'Aula 7'."""
    lesson_id = f"{module_id}-{lesson_number:02d}"
    return LESSON_TITLES.get(lesson_id, f"Aula {lesson_number}")


def get_lesson_ids(module_id: str) -> list[str]:
    """Devolve a lista de ids de aula de um módulo, tipo
    ['01-01', '01-02', ...]"""
    module = next((m for m in MODULES if m["id"] == module_id), None)
    if not module:
        return []
    return [f"{module_id}-{i:02d}" for i in range(1, module["lessons_count"] + 1)]


# Cada conquista tem um "gatilho" (condition) que é checado em
# analytics.check_achievements(). O front-end mostra unlocked/locked
# usando exatamente esses ids.
ACHIEVEMENTS = [
    {
        "id": "1",
        "title": "Primeiro passo",
        "description": "Complete a primeira aula",
        "condition": "first_lesson",
        "accent": "brand",
    },
    {
        "id": "2",
        "title": "Streak de 3 dias",
        "description": "Estude 3 dias seguidos",
        "condition": "streak_3",
        "accent": "brand",
    },
    {
        "id": "3",
        "title": "Módulo completo",
        "description": "Conclua um módulo inteiro",
        "condition": "module_complete",
        "accent": "accent",
    },
    {
        "id": "4",
        "title": "Dev dedicado",
        "description": "Estude 10h no total",
        "condition": "hours_10",
        "accent": "brand",
    },
]
