"""
lessons_content.py
==================
Conteúdo das lições do Módulo 01 — Lógica de Programação.
"""

from app.analytics import CURRICULUM


# ============================================================================
# LIÇÃO 01-01 — Fundamentos da Programação (2 tópicos)
# ============================================================================
LESSON_01_01 = {
    "id": "01-01",
    "module_id": "01",
    "title": "Fundamentos da Programação",
    "objectives": [
        "Entender o que é programação e o que significa programar",
        "Saber como um computador executa instruções",
        "Compreender o que é um algoritmo e lógica de programação",
        "Reconhecer algoritmos em tarefas do cotidiano",
        "Diferenciar código, programa e algoritmo",
    ],
    "reading_time_minutes": 29,
    "topics": [
        {
            "id": "topico-1",
            "title": "O que é Programar?",
            "content": [
                {"type": "text", "value": "Programação é o processo de criar instruções que dizem a um computador o que ele deve fazer. Computadores são extremamente rápidos, mas precisam receber instruções para realizar tarefas."},
                {"type": "text", "value": "Quando você usa uma calculadora para fazer `10 + 5`, existe um conjunto de instruções por trás daquela operação. Programar é aprender a criar essas instruções."},
                {"type": "text", "value": "**Programar é transformar problemas e ideias em instruções que um computador consegue executar.**"},
                {
                    "type": "code",
                    "caption": "Algoritmo — cálculo de média",
                    "value": "1. Receber a primeira nota\n2. Receber a segunda nota\n3. Receber a terceira nota\n4. Somar as três notas\n5. Dividir o resultado por 3\n6. Mostrar a média",
                },
                {"type": "text", "value": "Um **algoritmo** é uma sequência organizada de passos para resolver um problema. **Código** é quando transformamos essa solução em uma linguagem de programação. **Programa** é o conjunto de instruções que forma uma aplicação."},
                {
                    "type": "code",
                    "caption": "Transformando o algoritmo em código Python",
                    "value": "ano_atual = 2026\nano_nascimento = 2008\n\nidade = ano_atual - ano_nascimento\nprint(idade)",
                },
                {"type": "text", "value": "Muitos programas seguem o padrão **entrada → processamento → saída**. Entrada são os dados recebidos; processamento é o que o programa faz; saída é o resultado."},
                {"type": "text", "value": "**Um programador não é apenas alguém que sabe escrever código. É alguém que sabe resolver problemas usando código.**"},
            ],
            "exercise": {
                "id": "01-01-ex1",
                "title": "Calcular idade",
                "statement": "Crie duas variáveis: `ano_atual` com o valor `2026` e `ano_nascimento` com o valor `2008`. Calcule a `idade` subtraindo e imprima o resultado.",
                "starter_code": "ano_atual = 2026\nano_nascimento = 2008\n\n# Calcule a idade e imprima\nidade = \nprint(idade)",
                "tests": [
                    {"validation": "output_equals", "expected": "18"},
                    {"validation": "output_not_contains", "value": "-"},
                ],
                "hint": "Use o operador `-`: idade = ano_atual - ano_nascimento",
            },
        },
        {
            "id": "topico-2",
            "title": "Algoritmos no Dia a Dia",
            "content": [
                {"type": "text", "value": "Quando ouvimos a palavra **algoritmo**, pensamos logo em programação. Mas algoritmos fazem parte da nossa vida muito antes de escrevermos qualquer código."},
                {"type": "text", "value": "Sempre que seguimos uma **sequência de passos para alcançar um objetivo**, estamos seguindo algo parecido com um algoritmo."},
                {
                    "type": "code",
                    "caption": "Algoritmo — escovar os dentes",
                    "value": "1. Pegar a escova de dentes\n2. Colocar pasta de dente na escova\n3. Molhar a escova\n4. Escovar os dentes\n5. Enxaguar a boca\n6. Guardar a escova",
                },
                {"type": "text", "value": "**A ordem dos passos importa.** Se você tentar guardar a escova antes de escovar os dentes, o resultado não faz sentido."},
                {"type": "text", "value": "Alguns algoritmos envolvem **decisões**. Outros envolvem **repetições**. Tudo isso você vai aprender com `if`, `for` e `while`."},
            ],
            "exercise": {
                "id": "01-01-ex2",
                "title": "Calcular total da compra",
                "statement": "Crie duas variáveis: `preco` com o valor `20` e `quantidade` com o valor `3`. Calcule o `total` multiplicando e imprima o resultado.",
                "starter_code": "preco = 20\nquantidade = 3\n\n# Calcule o total e imprima\ntotal = \nprint(total)",
                "tests": [
                    {"validation": "output_equals", "expected": "60"},
                ],
                "hint": "Use o operador `*`: total = preco * quantidade",
            },
        },
    ],
    "summary": [
        "Programar é criar instruções para que um computador realize tarefas.",
        "Algoritmo é uma sequência organizada de passos.",
        "A ordem dos passos importa — na programação também.",
    ],
}


# ============================================================================
# LIÇÃO 01-03 — Variáveis e Constantes
# ============================================================================
LESSON_01_03 = {
    "id": "01-03",
    "module_id": "01",
    "title": "Variáveis e Constantes",
    "objectives": [
        "Entender o que são variáveis e por que usamos",
        "Aprender a nomear variáveis corretamente",
        "Diferenciar variáveis de constantes",
    ],
    "reading_time_minutes": 12,
    "topics": [
        {
            "id": "topico-1",
            "title": "Variáveis e Constantes",
            "content": [
                {"type": "text", "value": "Uma **variável** é um espaço na memória que guarda um valor. Pense nela como uma caixa etiquetada."},
                {
                    "type": "code",
                    "caption": "Criando uma variável",
                    "value": "idade = 25\nprint(idade)\n\nidade = 26   # trocando o valor\nprint(idade)",
                },
                {"type": "text", "value": "Em Python, você **não precisa declarar o tipo**. O Python descobre sozinho."},
                {"type": "text", "value": "**Boas práticas:** use nomes descritivos, comece com letra minúscula, use underline (`nome_completo`)."},
                {"type": "text", "value": "**Constantes** são valores que não devem mudar. Em Python, usamos letras MAIÚSCULAS por convenção."},
                {
                    "type": "code",
                    "caption": "Constantes em Python",
                    "value": "PI = 3.14159\nTAXA_JUROS = 0.05\n\nprint(PI)",
                },
            ],
            "exercise": {
                "id": "01-03-ex1",
                "title": "Nome e idade",
                "statement": "Crie uma variável `nome` com o valor `'Gabrielly Milhor'` e uma variável `idade` com o valor `30`. Imprima `nome` e depois `idade`, cada um em uma linha.",
                "starter_code": "# Crie as variáveis\nnome = \nidade = \n\nprint(nome)\nprint(idade)",
                "tests": [
                    {"validation": "output_equals", "expected": "30"},
                ],
                "hint": "nome = 'Gabrielly Milhor' e idade = 30",
            },
        },
    ],
    "summary": [
        "Variável é um espaço nomeado que guarda um valor.",
        "Use nomes descritivos e em minúsculas.",
        "Constantes usam MAIÚSCULAS.",
    ],
}


# ============================================================================
# LIÇÃO 01-04 — Tipos de Dados
# ============================================================================
LESSON_01_04 = {
    "id": "01-04",
    "module_id": "01",
    "title": "Tipos de Dados",
    "objectives": [
        "Conhecer os tipos básicos: str, int, float e bool",
        "Usar a função type() para descobrir o tipo",
        "Entender a diferença entre texto e número",
    ],
    "reading_time_minutes": 12,
    "topics": [
        {
            "id": "topico-1",
            "title": "Tipos de Dados em Python",
            "content": [
                {"type": "text", "value": "Cada valor em Python tem um **tipo**. Os quatro tipos mais básicos são: **str** (texto), **int** (inteiro), **float** (decimal) e **bool** (verdadeiro/falso)."},
                {
                    "type": "code",
                    "caption": "Os 4 tipos básicos",
                    "value": "nome = \"Gabrielly\"        # str\nidade = 28                  # int\naltura = 1.65               # float\nativo = True                # bool\n\nprint(type(nome))\nprint(type(idade))",
                },
                {"type": "text", "value": "**Strings sempre entre aspas.** Números sem aspas."},
                {
                    "type": "code",
                    "caption": "Convertendo tipos",
                    "value": "texto = \"25\"\nnumero = int(texto)\nprint(numero + 5)   # 30",
                },
            ],
            "exercise": {
                "id": "01-04-ex1",
                "title": "Descobrir o tipo",
                "statement": "Crie três variáveis: `nome` com valor `'Gabrielly'`, `idade` com valor `28` e `altura` com valor `1.65`. Imprima `type()` de cada uma, uma por linha.",
                "starter_code": "nome = \nidade = \naltura = \n\nprint(type(nome))\nprint(type(idade))\nprint(type(altura))",
                "tests": [
                    {"validation": "output_contains_all", "expected": ["str", "int", "float"]},
                ],
                "hint": "nome = 'Gabrielly', idade = 28, altura = 1.65",
            },
        },
    ],
    "summary": [
        "Python tem 4 tipos básicos: str, int, float e bool.",
        "Use type() para descobrir o tipo.",
        "Textos usam aspas; números não.",
    ],
}


# ============================================================================
# LIÇÃO 01-05 — Operadores Aritméticos
# ============================================================================
LESSON_01_05 = {
    "id": "01-05",
    "module_id": "01",
    "title": "Operadores Aritméticos",
    "objectives": [
        "Usar +, -, *, / em Python",
        "Conhecer //, % e **",
        "Entender a precedência dos operadores",
    ],
    "reading_time_minutes": 12,
    "topics": [
        {
            "id": "topico-1",
            "title": "Operadores Aritméticos",
            "content": [
                {"type": "text", "value": "Python tem vários operadores aritméticos. Os mais comuns são **+**, **-**, **\\*** e **/**."},
                {
                    "type": "code",
                    "caption": "Operadores básicos",
                    "value": "a = 10\nb = 3\n\nprint(a + b)   # 13\nprint(a - b)   # 7\nprint(a * b)   # 30\nprint(a / b)   # 3.333...",
                },
                {"type": "text", "value": "Existem ainda **//** (divisão inteira), **%** (resto) e **\\*\\*** (potência)."},
                {
                    "type": "code",
                    "caption": "Operadores especiais",
                    "value": "a = 10\nb = 3\n\nprint(a // b)   # 3\nprint(a % b)    # 1\nprint(a ** b)   # 1000",
                },
            ],
            "exercise": {
                "id": "01-05-ex1",
                "title": "Operações básicas",
                "statement": "Crie as variáveis `a = 15` e `b = 4`. Calcule e imprima: `soma` (a+b), `subtracao` (a-b), `multiplicacao` (a*b). Imprima os três valores, um por linha.",
                "starter_code": "a = 15\nb = 4\n\nsoma = \nsubtracao = \nmultiplicacao = \n\nprint(soma)\nprint(subtracao)\nprint(multiplicacao)",
                "tests": [
                    {"validation": "output_contains_all", "expected": ["19", "11", "60"]},
                ],
                "hint": "soma = a + b, subtracao = a - b, multiplicacao = a * b",
            },
        },
    ],
    "summary": [
        "Python tem +, -, *, / e também //, %, **.",
        "A precedência segue a matemática tradicional.",
        "Use parênteses para forçar uma ordem.",
    ],
}


# ============================================================================
# LIÇÃO 01-06 — Operadores Lógicos e Relacionais
# ============================================================================
LESSON_01_06 = {
    "id": "01-06",
    "module_id": "01",
    "title": "Operadores Lógicos e Relacionais",
    "objectives": [
        "Usar ==, !=, >, <, >=, <=",
        "Usar and, or e not",
        "Combinar condições",
    ],
    "reading_time_minutes": 12,
    "topics": [
        {
            "id": "topico-1",
            "title": "Operadores Lógicos e Relacionais",
            "content": [
                {"type": "text", "value": "**Operadores relacionais** comparam dois valores e retornam `True` ou `False`."},
                {
                    "type": "code",
                    "caption": "Operadores relacionais",
                    "value": "a = 10\nb = 5\n\nprint(a == b)   # False\nprint(a != b)   # True\nprint(a > b)    # True",
                },
                {"type": "text", "value": "**Operadores lógicos** combinam condições: `and`, `or` e `not`."},
                {
                    "type": "code",
                    "caption": "Operadores lógicos",
                    "value": "idade = 20\ntem_cnh = True\n\nprint(idade >= 18 and tem_cnh)   # True",
                },
            ],
            "exercise": {
                "id": "01-06-ex1",
                "title": "Pode dirigir?",
                "statement": "Crie as variáveis `idade = 20` e `tem_cnh = True`. Calcule `pode_dirigir` (idade maior ou igual a 18 E tem_cnh) e imprima. Saída esperada: `True`.",
                "starter_code": "idade = 20\ntem_cnh = True\n\n# Calcule e imprima\npode_dirigir = \nprint(pode_dirigir)",
                "tests": [
                    {"validation": "output_equals", "expected": "True"},
                ],
                "hint": "pode_dirigir = idade >= 18 and tem_cnh",
            },
        },
    ],
    "summary": [
        "Operadores relacionais: ==, !=, >, <, >=, <=.",
        "Operadores lógicos: and, or, not.",
    ],
}


# ============================================================================
# LIÇÃO 01-07 — Estruturas Condicionais (if/else)
# ============================================================================
LESSON_01_07 = {
    "id": "01-07",
    "module_id": "01",
    "title": "Estruturas Condicionais (if/else)",
    "objectives": [
        "Usar if, elif e else",
        "Entender a indentação em Python",
        "Tomar decisões no código",
    ],
    "reading_time_minutes": 14,
    "topics": [
        {
            "id": "topico-1",
            "title": "Estruturas Condicionais",
            "content": [
                {"type": "text", "value": "Com **if** você executa um bloco de código só se uma condição for verdadeira."},
                {
                    "type": "code",
                    "caption": "if / else",
                    "value": "idade = 15\n\nif idade >= 18:\n    print(\"Maior de idade\")\nelse:\n    print(\"Menor de idade\")",
                },
                {"type": "text", "value": "Use **elif** para testar várias condições em sequência."},
                {
                    "type": "code",
                    "caption": "if / elif / else",
                    "value": "nota = 7\n\nif nota >= 9:\n    print(\"Excelente\")\nelif nota >= 6:\n    print(\"Aprovado\")\nelse:\n    print(\"Reprovado\")",
                },
            ],
            "exercise": {
                "id": "01-07-ex1",
                "title": "Aprovado ou reprovado",
                "statement": "Crie a variável `nota = 7`. Se `nota >= 6`, imprima `'Aprovado'`. Senão, imprima `'Reprovado'`.",
                "starter_code": "nota = 7\n\nif nota >= 6:\n    # imprima Aprovado\n    \nelse:\n    # imprima Reprovado\n    ",
                "tests": [
                    {"validation": "output_equals", "expected": "Aprovado"},
                ],
                "hint": "Use print('Aprovado') dentro do if",
            },
        },
    ],
    "summary": [
        "if executa um bloco se a condição for True.",
        "elif testa outras condições.",
        "else executa quando nenhuma anterior foi True.",
    ],
}


# ============================================================================
# LIÇÃO 01-08 — Estruturas de Repetição (for/while)
# ============================================================================
LESSON_01_08 = {
    "id": "01-08",
    "module_id": "01",
    "title": "Estruturas de Repetição (for/while)",
    "objectives": [
        "Usar for para repetir com range",
        "Usar while para repetir por condição",
        "Entender quando usar cada um",
    ],
    "reading_time_minutes": 15,
    "topics": [
        {
            "id": "topico-1",
            "title": "Estruturas de Repetição",
            "content": [
                {"type": "text", "value": "**for** é usado quando você sabe quantas vezes quer repetir. **while** é usado quando quer repetir até uma condição mudar."},
                {
                    "type": "code",
                    "caption": "for com range",
                    "value": "for i in range(5):\n    print(i)\n# Imprime 0, 1, 2, 3, 4",
                },
                {
                    "type": "code",
                    "caption": "while",
                    "value": "contador = 0\n\nwhile contador < 5:\n    print(contador)\n    contador = contador + 1",
                },
                {"type": "text", "value": "Cuidado: se a condição nunca ficar falsa, o **loop infinito** acontece."},
            ],
            "exercise": {
                "id": "01-08-ex1",
                "title": "Imprimir de 1 a 5",
                "statement": "Use um `for` com `range` para imprimir os números de `1` a `5`, um por linha.",
                "starter_code": "# Use for e range\nfor i in :\n    print(i)",
                "tests": [
                    {"validation": "output_line_count", "expected": 5},
                    {"validation": "output_contains_all", "expected": ["1", "5"]},
                ],
                "hint": "for i in range(1, 6):",
            },
        },
    ],
    "summary": [
        "for repete um número conhecido de vezes.",
        "while repete enquanto uma condição for True.",
        "Sempre garanta que o loop termine.",
    ],
}


# ============================================================================
# LIÇÃO 01-09 — Listas
# ============================================================================
LESSON_01_09 = {
    "id": "01-09",
    "module_id": "01",
    "title": "Listas",
    "objectives": [
        "Criar e acessar listas",
        "Usar append, len e índices",
        "Percorrer listas com for",
    ],
    "reading_time_minutes": 12,
    "topics": [
        {
            "id": "topico-1",
            "title": "Listas em Python",
            "content": [
                {"type": "text", "value": "Uma **lista** é uma coleção ordenada de valores. Em Python, listas ficam entre colchetes."},
                {
                    "type": "code",
                    "caption": "Criando e acessando listas",
                    "value": "nomes = [\"Gabrielly\", \"Carlos\", \"Marina\"]\n\nprint(nomes[0])   # Gabrielly\nprint(len(nomes)) # 3",
                },
                {"type": "text", "value": "Use **append()** para adicionar itens no fim da lista."},
                {
                    "type": "code",
                    "caption": "Adicionando e percorrendo",
                    "value": "nomes = [\"Gabrielly\"]\nnomes.append(\"Carlos\")\n\nfor nome in nomes:\n    print(nome)",
                },
            ],
            "exercise": {
                "id": "01-09-ex1",
                "title": "Lista de números",
                "statement": "Crie uma lista `numeros` com os valores `10, 20, 30`. Imprima o primeiro item e o tamanho da lista, um por linha.",
                "starter_code": "numeros = [10, 20, 30]\n\nprint()   # primeiro item\nprint()   # tamanho",
                "tests": [
                    {"validation": "output_contains_all", "expected": ["10", "3"]},
                ],
                "hint": "numeros[0] e len(numeros)",
            },
        },
    ],
    "summary": [
        "Listas são coleções ordenadas entre [ ].",
        "Índices começam em 0.",
        "Use append() e len().",
    ],
}


# ============================================================================
# LIÇÃO 01-10 — Dicionários
# ============================================================================
LESSON_01_10 = {
    "id": "01-10",
    "module_id": "01",
    "title": "Dicionários",
    "objectives": [
        "Criar dicionários com chave-valor",
        "Acessar e modificar valores",
        "Percorrer um dicionário",
    ],
    "reading_time_minutes": 12,
    "topics": [
        {
            "id": "topico-1",
            "title": "Dicionários em Python",
            "content": [
                {"type": "text", "value": "Um **dicionário** guarda pares **chave → valor**. Fica entre chaves `{ }`."},
                {
                    "type": "code",
                    "caption": "Criando um dicionário",
                    "value": "pessoa = {\n    \"nome\": \"Gabrielly\",\n    \"idade\": 28\n}\n\nprint(pessoa[\"nome\"])   # Gabrielly",
                },
                {"type": "text", "value": "Para **adicionar ou modificar**, atribua um valor a uma chave."},
                {
                    "type": "code",
                    "caption": "Percorrendo um dicionário",
                    "value": "pessoa = {\"nome\": \"Gabrielly\", \"idade\": 28}\n\nfor chave in pessoa:\n    print(chave, pessoa[chave])",
                },
            ],
            "exercise": {
                "id": "01-10-ex1",
                "title": "Dicionário de produto",
                "statement": "Crie um dicionário `produto` com `nome = 'Notebook'` e `preco = 3500`. Imprima o valor de `nome` e depois o de `preco`, um por linha.",
                "starter_code": "produto = {\n    \"nome\": ,\n    \"preco\": \n}\n\nprint(produto[\"nome\"])\nprint(produto[\"preco\"])",
                "tests": [
                    {"validation": "output_contains_all", "expected": ["Notebook", "3500"]},
                ],
                "hint": "\"nome\": \"Notebook\" e \"preco\": 3500",
            },
        },
    ],
    "summary": [
        "Dicionários guardam pares chave → valor.",
        "Acesse com dicionario[\"chave\"].",
        "Adicione/modifique atribuindo um valor novo.",
    ],
}


# ============================================================================
# LIÇÃO 01-11 — Funções
# ============================================================================
LESSON_01_11 = {
    "id": "01-11",
    "module_id": "01",
    "title": "Funções",
    "objectives": [
        "Criar funções com def",
        "Usar parâmetros e return",
        "Reutilizar código",
    ],
    "reading_time_minutes": 14,
    "topics": [
        {
            "id": "topico-1",
            "title": "Funções em Python",
            "content": [
                {"type": "text", "value": "Uma **função** é um bloco de código com nome que pode ser chamado quantas vezes você quiser. Isso evita repetir código."},
                {
                    "type": "code",
                    "caption": "Função com parâmetros e return",
                    "value": "def somar(a, b):\n    return a + b\n\nresultado = somar(3, 5)\nprint(resultado)   # 8",
                },
            ],
            "exercise": {
                "id": "01-11-ex1",
                "title": "Função de multiplicação",
                "statement": "Crie uma função `multiplicar(a, b)` que retorna `a * b`. Chame com `4` e `5` e imprima o resultado.",
                "starter_code": "def multiplicar(a, b):\n    # retorne a multiplicação\n    \n\nresultado = multiplicar(4, 5)\nprint(resultado)",
                "tests": [
                    {"validation": "output_equals", "expected": "20"},
                ],
                "hint": "Dentro da função, use: return a * b",
            },
        },
    ],
    "summary": [
        "Funções agrupam código reutilizável.",
        "Use def nome(parametros): para criar.",
        "return devolve um valor da função.",
    ],
}


# ============================================================================
# LIÇÃO 01-12 — Projeto: Calculadora
# ============================================================================
LESSON_01_12 = {
    "id": "01-12",
    "module_id": "01",
    "title": "Projeto: Calculadora",
    "objectives": [
        "Aplicar tudo o que aprendeu em um projeto",
        "Criar funções para cada operação",
        "Combinar funções, condicionais e retorno",
    ],
    "reading_time_minutes": 20,
    "topics": [
        {
            "id": "topico-1",
            "title": "Projeto Final do Módulo",
            "content": [
                {"type": "text", "value": "Neste projeto final do módulo, você vai criar uma **calculadora simples** com funções para cada operação."},
                {
                    "type": "code",
                    "caption": "Estrutura da calculadora",
                    "value": "def somar(a, b):\n    return a + b\n\ndef subtrair(a, b):\n    return a - b",
                },
                {"type": "text", "value": "**Dividir o problema em funções pequenas** é o que programadores profissionais fazem todos os dias."},
            ],
            "exercise": {
                "id": "01-12-ex1",
                "title": "Sua calculadora",
                "statement": "Crie duas funções: `somar(a, b)` que retorna `a + b` e `subtrair(a, b)` que retorna `a - b`. Chame `somar(10, 5)` e `subtrair(10, 5)` e imprima os dois resultados, um por linha.",
                "starter_code": "def somar(a, b):\n    # retorne a soma\n    \n\ndef subtrair(a, b):\n    # retorne a subtração\n    \n\nprint(somar(10, 5))\nprint(subtrair(10, 5))",
                "tests": [
                    {"validation": "output_contains_all", "expected": ["15", "5"]},
                ],
                "hint": "somar: return a + b | subtrair: return a - b",
            },
        },
    ],
    "summary": [
        "Dividir um problema em funções pequenas facilita a solução.",
        "Cada função faz uma coisa e faz bem.",
        "Esse padrão é usado em projetos profissionais.",
    ],
}


# ============================================================================
# BANCO DE LIÇÕES
# ============================================================================
LESSONS: dict[str, dict] = {
    "01-01": LESSON_01_01,
    "01-03": LESSON_01_03,
    "01-04": LESSON_01_04,
    "01-05": LESSON_01_05,
    "01-06": LESSON_01_06,
    "01-07": LESSON_01_07,
    "01-08": LESSON_01_08,
    "01-09": LESSON_01_09,
    "01-10": LESSON_01_10,
    "01-11": LESSON_01_11,
    "01-12": LESSON_01_12,
}


# ============================================================================
# FUNÇÕES AUXILIARES
# ============================================================================
def _flat_lesson_order() -> list[tuple[str, str]]:
    order = []
    for module in CURRICULUM:
        for lesson in module["lessons"]:
            order.append((module["id"], lesson["id"]))
    return order


def get_lesson(lesson_id: str) -> dict | None:
    return LESSONS.get(lesson_id)


def get_adjacent_lesson_ids(lesson_id: str) -> tuple[str | None, str | None]:
    order = _flat_lesson_order()
    ids = [lid for _, lid in order]
    if lesson_id not in ids:
        return None, None
    idx = ids.index(lesson_id)
    prev_id = ids[idx - 1] if idx > 0 else None
    next_id = ids[idx + 1] if idx < len(ids) - 1 else None
    return prev_id, next_id


def validate_submission(exercise: dict, execution_stdout: str) -> dict:
    output = execution_stdout.strip()
    output_lines = [l for l in execution_stdout.splitlines() if l.strip()]

    for test in exercise["tests"]:
        kind = test["validation"]

        if kind == "output_contains_any":
            if not any(exp in output for exp in test["expected"]):
                return {"success": False, "expected": " ou ".join(test["expected"]), "got": output or "(sem saída)"}

        elif kind == "output_contains_all":
            missing = [exp for exp in test["expected"] if exp not in output]
            if missing:
                return {"success": False, "expected": ", ".join(missing), "got": output or "(sem saída)"}

        elif kind == "output_equals":
            last_line = output_lines[-1] if output_lines else ""
            expected_str = str(test["expected"]).strip()
            if last_line.strip() != expected_str:
                return {"success": False, "expected": expected_str, "got": last_line or "(sem saída)"}

        elif kind == "output_not_contains":
            if test["value"] in output:
                return {"success": False, "expected": f"saída sem '{test['value']}'", "got": output}

        elif kind == "output_line_count":
            if len(output_lines) != test["expected"]:
                return {"success": False, "expected": f"{test['expected']} linha(s) de saída", "got": f"{len(output_lines)} linha(s)"}

    return {"success": True}