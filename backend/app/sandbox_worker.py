"""
sandbox_worker.py
==================
Executa código do aluno em subprocesso isolado.
Compatível com Windows (sem `resource`) e Linux/macOS (com `resource`).
"""

import sys
import io
import json
import contextlib
import builtins as _builtins_module

# `resource` só existe em Linux/macOS. No Windows, vira None.
try:
    import resource
except ImportError:
    resource = None  # type: ignore


BLOCKED_MODULES = {
    "os", "sys", "subprocess", "socket", "shutil", "pathlib",
    "importlib", "multiprocessing", "threading", "ctypes",
    "signal", "resource", "pty", "fcntl", "asyncio",
    "http", "urllib", "ftplib", "telnetlib", "smtplib",
    "pickle", "shelve", "marshal", "code", "codeop",
    "inspect", "gc", "tracemalloc", "sysconfig", "platform",
}

BLOCKED_BUILTINS = {
    "open", "input", "exec", "eval", "compile", "__import__",
    "exit", "quit", "help", "breakpoint",
}

MAX_OUTPUT_CHARS = 20_000


def _set_resource_limits() -> None:
    """Aplica limites de CPU/memória (só funciona em POSIX)."""
    if resource is None:
        return  # Windows: sem `resource`. O timeout do subprocess protege.

    cpu_seconds = 5
    memory_bytes = 128 * 1024 * 1024
    try:
        resource.setrlimit(resource.RLIMIT_CPU, (cpu_seconds, cpu_seconds))
        resource.setrlimit(resource.RLIMIT_AS, (memory_bytes, memory_bytes))
        resource.setrlimit(resource.RLIMIT_NPROC, (0, 0))
        resource.setrlimit(resource.RLIMIT_FSIZE, (0, 0))
    except (ValueError, OSError):
        pass


def _restricted_import(name, globals=None, locals=None, fromlist=(), level=0):
    root = name.split(".")[0]
    if root in BLOCKED_MODULES:
        raise ImportError(
            f"o módulo '{root}' não pode ser usado nos exercícios "
            "(por segurança). Tente resolver o exercício sem ele."
        )
    return _builtins_module.__import__(name, globals, locals, fromlist, level)


def _build_restricted_globals() -> dict:
    safe_builtins = {
        k: v for k, v in vars(_builtins_module).items()
        if k not in BLOCKED_BUILTINS
    }
    safe_builtins["__import__"] = _restricted_import
    return {"__builtins__": safe_builtins, "__name__": "__aluno__"}


def run(code: str, stdin_data: str = "") -> dict:
    _set_resource_limits()

    stdout_buffer = io.StringIO()
    stderr_buffer = io.StringIO()
    restricted_globals = _build_restricted_globals()

    old_stdin = sys.stdin
    sys.stdin = io.StringIO(stdin_data)
    try:
        with contextlib.redirect_stdout(stdout_buffer), \
             contextlib.redirect_stderr(stderr_buffer):
            compiled = compile(code, "<exercicio>", "exec")
            exec(compiled, restricted_globals)
        return {
            "ok": True,
            "stdout": stdout_buffer.getvalue()[:MAX_OUTPUT_CHARS],
            "stderr": stderr_buffer.getvalue()[:MAX_OUTPUT_CHARS],
        }
    except SyntaxError as e:
        return {
            "ok": False,
            "error_type": "SyntaxError",
            "error_message": f"{e.msg} (linha {e.lineno})",
            "stdout": stdout_buffer.getvalue()[:MAX_OUTPUT_CHARS],
        }
    except MemoryError:
        return {
            "ok": False,
            "error_type": "MemoryError",
            "error_message": "o código usou memória demais.",
        }
    except RecursionError:
        return {
            "ok": False,
            "error_type": "RecursionError",
            "error_message": "recursão infinita ou profunda demais.",
        }
    except Exception as e:
        return {
            "ok": False,
            "error_type": type(e).__name__,
            "error_message": str(e),
            "stdout": stdout_buffer.getvalue()[:MAX_OUTPUT_CHARS],
        }
    finally:
        sys.stdin = old_stdin


def main() -> None:
    try:
        payload = json.loads(sys.stdin.read())
    except json.JSONDecodeError:
        print(json.dumps({
            "ok": False,
            "error_type": "InternalError",
            "error_message": "payload inválido",
        }))
        return

    result = run(payload.get("code", ""), payload.get("stdin_data", ""))
    print(json.dumps(result))


if __name__ == "__main__":
    main()