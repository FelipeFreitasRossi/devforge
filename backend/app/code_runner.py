"""
code_runner.py
==============
Roda no processo do FastAPI. Recebe o código do aluno, chama
sandbox_worker.py em um subprocesso isolado com timeout.
"""

import sys
import json
import subprocess
from pathlib import Path

WORKER_PATH = Path(__file__).parent / "sandbox_worker.py"
TIMEOUT_SECONDS = 6


class ExecutionResult:
    def __init__(self, ok: bool, stdout: str = "", stderr: str = "",
                 error_type: str | None = None, error_message: str | None = None):
        self.ok = ok
        self.stdout = stdout
        self.stderr = stderr
        self.error_type = error_type
        self.error_message = error_message


def run_student_code(code: str, stdin_data: str = "") -> ExecutionResult:
    """Executa o código do aluno em um subprocesso Python isolado."""
    payload = json.dumps({"code": code, "stdin_data": stdin_data})

    try:
        proc = subprocess.run(
            [sys.executable, "-I", "-S", str(WORKER_PATH)],
            input=payload,
            capture_output=True,
            text=True,
            timeout=TIMEOUT_SECONDS,
        )
    except subprocess.TimeoutExpired:
        return ExecutionResult(
            ok=False,
            error_type="Timeout",
            error_message="o código demorou demais para rodar (limite: 5s). "
                           "Verifique se não há um loop infinito.",
        )

    if proc.returncode != 0 and not proc.stdout.strip():
        return ExecutionResult(
            ok=False,
            error_type="InternalError",
            error_message="não foi possível executar o código. Tente novamente.",
            stderr=proc.stderr[:2000],
        )

    try:
        data = json.loads(proc.stdout.strip().splitlines()[-1])
    except (json.JSONDecodeError, IndexError):
        return ExecutionResult(
            ok=False,
            error_type="InternalError",
            error_message="erro ao interpretar o resultado da execução.",
        )

    return ExecutionResult(
        ok=data.get("ok", False),
        stdout=data.get("stdout", ""),
        stderr=data.get("stderr", ""),
        error_type=data.get("error_type"),
        error_message=data.get("error_message"),
    )