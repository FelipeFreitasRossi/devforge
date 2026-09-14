"""
lessons.py
==========
Conteúdo das lições (texto + código + exercícios) e validação dos testes.
"""

from app.analytics import CURRICULUM


# ============================================================================
# LIÇÃO 01-01 — O que é Programar?
# ============================================================================
LESSON_01_01 = {
    "id": "01-01",
    "module_id": "01",
    "title": "O que é Programar?",
    "objectives": [
        "Entender o que é programação e o que significa programar",
        "Saber como um computador executa instruções",
        "Compreender o que é um algoritmo e lógica de programação",
        "Diferenciar código, programa e algoritmo",
        "Criar seu primeiro algoritmo em Python",
    ],
    "reading_time_minutes": 15,
    "content": [
        {
            "type": "text",
            "value": (
                "Programação é o processo de criar instruções que dizem a "
                "um computador o que ele deve fazer. Computadores são "
                "extremamente rápidos, mas precisam receber instruções para "
                "realizar tarefas."
            ),
        },
        {
            "type": "text",
            "value": (
                "Quando você usa uma calculadora para fazer `10 + 5`, existe "
                "um conjunto de instruções por trás daquela operação. "
                "Programar é aprender a criar essas instruções."
            ),
        },
        {
            "type": "text",
            "value": (
                "**Programar é transformar problemas e ideias em instruções "
                "que um computador consegue executar.**"
            ),
        },
        {
            "type": "text",
            "value": (
                "Antes de escrever código, precisamos entender: qual é o "
                "problema? Como podemos resolver? Como transformar em "
                "código? Imagine calcular a média de um aluno: primeiro "
                "pensamos na solução passo a passo."
            ),
        },
        {
            "type": "code",
            "caption": "Algoritmo — cálculo de média",
            "value": (
                "1. Receber a primeira nota\n"
                "2. Receber a segunda nota\n"
                "3. Receber a terceira nota\n"
                "4. Somar as três notas\n"
                "5. Dividir o resultado por 3\n"
                "6. Mostrar a média"
            ),
        },
        {
            "type": "text",
            "value": (
                "**Computadores não pensam como nós.** Precisamos quebrar "
                "problemas grandes em etapas pequenas e específicas."
            ),
        },
        {
            "type": "text",
            "value": (
                "Um **algoritmo** é uma sequência organizada de passos para "
                "resolver um problema. Você usa algoritmos todos os dias — "
                "escovar os dentes, seguir uma receita, dar instruções."
            ),
        },
        {
            "type": "code",
            "caption": "Exemplo de algoritmo — aprovação do aluno",
            "value": (
                "1. Receber a nota do aluno\n"
                "2. Verificar a nota\n"
                "3. Se a nota for maior ou igual a 6, informar \"Aprovado\"\n"
                "4. Caso contrário, informar \"Reprovado\""
            ),
        },
        {
            "type": "text",
            "value": (
                "A **lógica de programação** é a capacidade de organizar "
                "pensamentos e instruções de maneira lógica para resolver "
                "problemas."
            ),
        },
        {
            "type": "text",
            "value": (
                "**Algoritmo** é a sequência de passos. **Código** é quando "
                "transformamos essa solução em uma linguagem. **Programa** "
                "é o conjunto de instruções que forma uma aplicação."
            ),
        },
        {
            "type": "code",
            "caption": "Transformando o algoritmo em código Python",
            "value": (
                "ano_atual = 2026\n"
                "ano_nascimento = 2008\n"
                "\n"
                "idade = ano_atual - ano_nascimento\n"
                "\n"
                "print(idade)"
            ),
        },
        {
            "type": "text",
            "value": (
                "Muitos programas seguem o padrão **entrada → processamento "
                "→ saída**. Entrada são os dados recebidos; processamento é "
                "o que o programa faz; saída é o resultado."
            ),
        },
        {
            "type": "code",
            "caption": "Entrada, processamento e saída",
            "value": (
                "# Entrada: 10 e 5\n"
                "# Processamento: soma\n"
                "# Saída: 15\n"
                "\n"
                "a = 10\n"
                "b = 5\n"
                "resultado = a + b\n"
                "print(resultado)"
            ),
        },
        {
            "type": "text",
            "value": (
                "**Um programador não é apenas alguém que sabe escrever "
                "código. É alguém que sabe resolver problemas usando "
                "código.** Antes de escrever, precisa compreender o "
                "problema, planejar a solução e só então desenvolver."
            ),
        },
        {
            "type": "text",
            "value": (
                "Programadores dividem problemas grandes em partes menores. "
                "Um sistema de vendas pode virar: cadastro de usuários, "
                "login, cadastro de produtos, estoque, carrinho, pagamento, "
                "pedidos e relatórios."
            ),
        },
    ],
    "exercises": [
        {
            "id": "01-01-ex1",
            "title": "Calcular idade",
            "statement": (
                "Crie duas variáveis: `ano_atual` com o valor `2026` e "
                "`ano_nascimento` com o valor `2008`. Calcule a `idade` "
                "subtraindo o ano de nascimento do ano atual e imprima o "
                "resultado."
            ),
            "starter_code": (
                "ano_atual = 2026\n"
                "ano_nascimento = 2008\n"
                "\n"
                "# Calcule a idade e imprima\n"
                "idade = \n"
                "print(idade)"
            ),
            "tests": [
                {"validation": "output_equals", "expected": "18"},
                {"validation": "output_not_contains", "value": "-"},
            ],
            "hint": "Use o operador `-`: idade = ano_atual - ano_nascimento",
        },
        {
            "id": "01-01-ex2",
            "title": "Somar dois números",
            "statement": (
                "Crie duas variáveis: `a` com o valor `7` e `b` com o valor "
                "`13`. Calcule a `soma` e imprima o resultado."
            ),
            "starter_code": (
                "a = 7\n"
                "b = 13\n"
                "\n"
                "# Calcule a soma e imprima\n"
                "soma = \n"
                "print(soma)"
            ),
            "tests": [
                {"validation": "output_equals", "expected": "20"},
            ],
            "hint": "Use o operador `+`: soma = a + b",
        },
    ],
    "summary": [
        "Programar é criar instruções para que um computador realize tarefas.",
        "Algoritmo é uma sequência organizada de passos para resolver um problema.",
        "Muitos programas seguem o padrão: entrada → processamento → saída.",
    ],
}


# ============================================================================
# LIÇÃO 01-02 — Algoritmos no Dia a Dia
# ============================================================================
LESSON_01_02 = {
    "id": "01-02",
    "module_id": "01",
    "title": "Algoritmos no Dia a Dia",
    "objectives": [
        "Reconhecer algoritmos em tarefas do cotidiano",
        "Entender por que a ordem dos passos importa",
        "Identificar decisões e repetições em algoritmos",
        "Transformar tarefas reais em algoritmos em Python",
    ],
    "reading_time_minutes": 14,
    "content": [
        {
            "type": "text",
            "value": (
                "Quando ouvimos a palavra **algoritmo**, pensamos logo em "
                "programação. Mas algoritmos fazem parte da nossa vida muito "
                "antes de escrevermos qualquer código."
            ),
        },
        {
            "type": "text",
            "value": (
                "Sempre que seguimos uma **sequência de passos para alcançar "
                "um objetivo**, estamos seguindo algo parecido com um "
                "algoritmo. Preparar um sanduíche, por exemplo, exige uma "
                "ordem específica de ações."
            ),
        },
        {
            "type": "code",
            "caption": "Algoritmo — escovar os dentes",
            "value": (
                "1. Pegar a escova de dentes\n"
                "2. Colocar pasta de dente na escova\n"
                "3. Molhar a escova\n"
                "4. Escovar os dentes\n"
                "5. Enxaguar a boca\n"
                "6. Lavar a escova\n"
                "7. Guardar a escova"
            ),
        },
        {
            "type": "text",
            "value": (
                "Perceba que existe um **objetivo** (escovar os dentes), uma "
                "**sequência de ações** (os passos) e um **resultado "
                "esperado** (dentes escovados). Isso é a ideia de algoritmo."
            ),
        },
        {
            "type": "text",
            "value": (
                "**A ordem dos passos importa.** Se você tentar guardar a "
                "escova antes de escovar os dentes, o resultado não faz "
                "sentido. Na programação é a mesma coisa: o computador "
                "executa as instruções na ordem que você escrever."
            ),
        },
        {
            "type": "code",
            "caption": "Algoritmo — preparar café",
            "value": (
                "1. Pegar uma xícara\n"
                "2. Colocar café no filtro\n"
                "3. Aquecer a água\n"
                "4. Passar a água pelo café\n"
                "5. Colocar o café na xícara\n"
                "6. Adicionar açúcar, se desejar\n"
                "7. Servir"
            ),
        },
        {
            "type": "text",
            "value": (
                "Alguns algoritmos envolvem **decisões**. Imagine sair de "
                "casa: você verifica se está chovendo e decide se leva "
                "guarda-chuva."
            ),
        },
        {
            "type": "code",
            "caption": "Algoritmo com decisão",
            "value": (
                "1. Verificar se está chovendo\n"
                "2. Se estiver chovendo:\n"
                "      levar guarda-chuva\n"
                "3. Caso contrário:\n"
                "      sair sem guarda-chuva"
            ),
        },
        {
            "type": "text",
            "value": (
                "Outros algoritmos envolvem **repetições**. Regar várias "
                "plantas exige repetir o mesmo passo várias vezes. Na "
                "programação, isso se chama **loop** e você vai aprender com "
                "`for` e `while` mais para frente."
            ),
        },
        {
            "type": "code",
            "caption": "Algoritmo com repetição",
            "value": (
                "1. Pegar o regador\n"
                "2. Escolher uma planta\n"
                "3. Regar a planta\n"
                "4. Verificar se existem outras plantas\n"
                "5. Se existirem, repetir\n"
                "6. Se não existirem, finalizar"
            ),
        },
        {
            "type": "text",
            "value": (
                "Você encontra algoritmos em **aplicativos de transporte** "
                "(cálculo de rotas), **redes sociais** (escolha de conteúdo "
                "no feed), **lojas online** (processamento de pedidos) e "
                "**bancos** (transferências). Tudo isso envolve sequências, "
                "decisões e repetições."
            ),
        },
        {
            "type": "code",
            "caption": "Algoritmo — transferência bancária",
            "value": (
                "1. Receber os dados da transferência\n"
                "2. Verificar a conta de origem\n"
                "3. Verificar o saldo\n"
                "4. Verificar os dados do destinatário\n"
                "5. Validar a operação\n"
                "6. Processar a transferência\n"
                "7. Atualizar os saldos\n"
                "8. Informar o resultado"
            ),
        },
        {
            "type": "text",
            "value": (
                "Voltando ao conceito de **entrada → processamento → "
                "saída**: muitos algoritmos recebem dados, fazem algo com "
                "eles e devolvem um resultado. Um cálculo de compra, por "
                "exemplo: preço × quantidade = total."
            ),
        },
        {
            "type": "code",
            "caption": "Do algoritmo ao código Python",
            "value": (
                "preco = 50\n"
                "quantidade = 3\n"
                "\n"
                "total = preco * quantidade\n"
                "print(total)\n"
                "# Saída: 150"
            ),
        },
        {
            "type": "text",
            "value": (
                "**Transformar tarefas em algoritmos** é uma habilidade que "
                "você vai usar toda a vida como programador. Dividir um "
                "problema grande em etapas pequenas facilita a solução e "
                "evita erros."
            ),
        },
    ],
    "exercises": [
        {
            "id": "01-02-ex1",
            "title": "Calcular total da compra",
            "statement": (
                "Crie duas variáveis: `preco` com o valor `20` e "
                "`quantidade` com o valor `3`. Calcule o `total` "
                "multiplicando os dois e imprima o resultado."
            ),
            "starter_code": (
                "preco = 20\n"
                "quantidade = 3\n"
                "\n"
                "# Calcule o total e imprima\n"
                "total = \n"
                "print(total)"
            ),
            "tests": [
                {"validation": "output_equals", "expected": "60"},
            ],
            "hint": "Use o operador `*`: total = preco * quantidade",
        },
    ],
    "summary": [
        "Algoritmos estão no dia a dia: receitas, rotinas, processos.",
        "A ordem dos passos é essencial para chegar ao resultado.",
        "Algoritmos podem ter sequências, decisões e repetições.",
    ],
}


# ============================================================================
# LIÇÃO 01-04 — Variáveis e Tipos de Dados
# ============================================================================
LESSON_01_04 = {
    "id": "01-04",
    "module_id": "01",
    "title": "Variáveis e Tipos de Dados",
    "objectives": [
        "Entender o que é uma variável e para que ela serve",
        "Reconhecer os tipos básicos: str, int, float e bool",
        "Criar e imprimir variáveis no Python",
    ],
    "reading_time_minutes": 12,
    "content": [
        {
            "type": "text",
            "value": (
                "Uma variável é um nome que guarda um valor na memória do "
                "computador. Em vez de repetir um valor várias vezes no "
                "código, você guarda ele em uma variável e usa esse nome "
                "sempre que precisar."
            ),
        },
        {
            "type": "code",
            "caption": "Criando variáveis",
            "value": (
                "nome = \"Ana\"\n"
                "idade = 28\n"
                "altura = 1.65\n"
                "esta_matriculada = True\n"
                "\n"
                "print(nome, idade, altura, esta_matriculada)"
            ),
        },
        {
            "type": "text",
            "value": (
                "Repare que não precisamos declarar o tipo da variável — "
                "o Python descobre sozinho. `nome` virou uma string (str), "
                "`idade` um número inteiro (int), `altura` um número "
                "decimal (float) e `esta_matriculada` um booleano (bool)."
            ),
        },
        {
            "type": "code",
            "caption": "Descobrindo o tipo de uma variável",
            "value": "print(type(nome))\nprint(type(idade))\nprint(type(altura))",
        },
        {
            "type": "text",
            "value": (
                "Strings sempre ficam entre aspas simples ou duplas. "
                "Números não levam aspas — se colocar aspas, o Python vai "
                "tratar como texto, mesmo que pareça um número."
            ),
        },
    ],
    "exercises": [
        {
            "id": "01-04-ex1",
            "title": "Criar e imprimir variáveis",
            "statement": (
                "Crie uma variável chamada `nome` com o seu nome (como "
                "string) e uma variável chamada `idade` com um número "
                "inteiro. Depois, imprima as duas variáveis, uma por linha."
            ),
            "starter_code": "nome = \nidade = \n\nprint(nome)\nprint(idade)",
            "tests": [
                {"validation": "output_line_count", "expected": 2},
                {"validation": "output_not_contains", "value": "Traceback"},
            ],
            "hint": "Strings usam aspas: nome = 'Seu Nome'. Números não usam aspas: idade = 25",
        },
    ],
    "summary": [
        "Variáveis guardam valores para reutilizar no código.",
        "O Python identifica o tipo automaticamente (str, int, float, bool).",
        "Strings usam aspas; números não.",
    ],
}


# ============================================================================
# BANCO DE LIÇÕES
# ============================================================================
LESSONS: dict[str, dict] = {
    "01-01": LESSON_01_01,
    "01-02": LESSON_01_02,
    "01-04": LESSON_01_04,
}


# ============================================================================
# FUNÇÕES AUXILIARES
# ============================================================================
def _placeholder_lesson(module: dict, lesson: dict) -> dict:
    """Gera lição mínima para currículo ainda não escrito."""
    return {
        "id": lesson["id"],
        "module_id": module["id"],
        "title": lesson["title"],
        "objectives": [f"Entender os conceitos de {lesson['title'].lower()}"],
        "reading_time_minutes": lesson.get("reading_time_minutes", 15),
        "content": [
            {
                "type": "text",
                "value": (
                    f"Conteúdo de '{lesson['title']}' em preparação. "
                    "Enquanto isso, pratique com o exercício abaixo."
                ),
            },
        ],
        "exercises": [
            {
                "id": f"{lesson['id']}-ex1",
                "title": "Exercício rápido",
                "statement": "Escreva um programa que imprima a mensagem 'Concluído'.",
                "starter_code": "print()",
                "tests": [
                    {"validation": "output_equals", "expected": "Concluído"},
                ],
                "hint": "Use print('Concluído') dentro dos parênteses.",
            }
        ],
        "summary": [
            "Esta lição ainda está em produção.",
            "O exercício abaixo já está funcional.",
            "Volte em breve para o conteúdo completo.",
        ],
    }


def _flat_lesson_order() -> list[tuple[str, str]]:
    """Retorna [(module_id, lesson_id), ...] na ordem do currículo."""
    order = []
    for module in CURRICULUM:
        for lesson in module["lessons"]:
            order.append((module["id"], lesson["id"]))
    return order


def get_lesson(lesson_id: str) -> dict | None:
    if lesson_id in LESSONS:
        return LESSONS[lesson_id]

    for module in CURRICULUM:
        for lesson in module["lessons"]:
            if lesson["id"] == lesson_id:
                return _placeholder_lesson(module, lesson)
    return None


def get_adjacent_lesson_ids(lesson_id: str) -> tuple[str | None, str | None]:
    """Retorna (id_anterior, id_proximo) na ordem do currículo."""
    order = _flat_lesson_order()
    ids = [lid for _, lid in order]
    if lesson_id not in ids:
        return None, None
    idx = ids.index(lesson_id)
    prev_id = ids[idx - 1] if idx > 0 else None
    next_id = ids[idx + 1] if idx < len(ids) - 1 else None
    return prev_id, next_id


def validate_submission(exercise: dict, execution_stdout: str) -> dict:
    """Roda os `tests` do exercício contra a saída do código do aluno."""
    output = execution_stdout.strip()
    output_lines = [l for l in execution_stdout.splitlines() if l.strip()]

    for test in exercise["tests"]:
        kind = test["validation"]

        if kind == "output_contains_any":
            if not any(exp in output for exp in test["expected"]):
                return {
                    "success": False,
                    "expected": " ou ".join(test["expected"]),
                    "got": output or "(sem saída)",
                }

        elif kind == "output_contains_all":
            missing = [exp for exp in test["expected"] if exp not in output]
            if missing:
                return {
                    "success": False,
                    "expected": ", ".join(missing),
                    "got": output or "(sem saída)",
                }

        elif kind == "output_equals":
            last_line = output_lines[-1] if output_lines else ""
            expected_str = str(test["expected"]).strip()
            if last_line.strip() != expected_str:
                return {
                    "success": False,
                    "expected": expected_str,
                    "got": last_line or "(sem saída)",
                }

        elif kind == "output_not_contains":
            if test["value"] in output:
                return {
                    "success": False,
                    "expected": f"saída sem '{test['value']}'",
                    "got": output,
                }

        elif kind == "output_line_count":
            if len(output_lines) != test["expected"]:
                return {
                    "success": False,
                    "expected": f"{test['expected']} linha(s) de saída",
                    "got": f"{len(output_lines)} linha(s)",
                }

    return {"success": True}