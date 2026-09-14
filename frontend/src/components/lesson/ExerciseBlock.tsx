import { CheckCircle2, XCircle, Loader2, Lightbulb, Send } from 'lucide-react';
import { CodeEditor } from './CodeEditor';
import type { SubmitCodeResponse } from '../../services/api';

interface ExerciseBlockProps {
  exerciseNumber: number;
  title: string;
  statement: string;
  hint: string;
  code: string;
  onCodeChange: (code: string) => void;
  onSubmit: () => void;
  submitting: boolean;
  result: SubmitCodeResponse | null;
  attempts: number;
}

export function ExerciseBlock({
  exerciseNumber,
  title,
  statement,
  hint,
  code,
  onCodeChange,
  onSubmit,
  submitting,
  result,
  attempts,
}: ExerciseBlockProps) {
  return (
    <div className="space-y-6 p-5 md:p-6 rounded-2xl border border-border bg-surface-elevated">
      {/* Cabeçalho do exercício */}
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-500/15 border border-brand-500/40 flex items-center justify-center">
          <span className="text-lg font-bold text-brand-500 font-mono">
            {exerciseNumber}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-text-primary mb-1">
            {title}
          </h3>
          {attempts > 0 && (
            <p className="text-xs text-text-muted">
              {attempts} {attempts === 1 ? 'tentativa' : 'tentativas'} até agora
            </p>
          )}
        </div>
      </div>

      {/* Enunciado */}
      <div className="p-4 rounded-xl border border-brand-500/30 bg-gradient-to-br from-brand-500/5 to-transparent">
        <div className="flex items-start gap-3">
          <Lightbulb size={16} className="text-brand-500 shrink-0 mt-1" />
          <p className="text-text-primary leading-relaxed">{statement}</p>
        </div>
      </div>

      {/* Editor */}
      <CodeEditor value={code} onChange={onCodeChange} disabled={submitting} />

      {/* Botão */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-xs text-text-muted">
          Escreva o código e clique em <strong>Enviar</strong>
        </p>
        <button
          onClick={onSubmit}
          disabled={submitting || !code.trim()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-brand-500 text-surface font-semibold hover:bg-brand-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-glow w-full sm:w-auto"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Executando...
            </>
          ) : (
            <>
              <Send size={16} />
              Enviar código
            </>
          )}
        </button>
      </div>

      {/* Resultado */}
      {result && (
        <div
          className={`p-5 rounded-xl border ${
            result.success
              ? 'border-accent-500/40 bg-accent-500/5'
              : 'border-danger/40 bg-danger/5'
          }`}
        >
          {result.success ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-accent-500" />
                <span className="font-semibold text-accent-500">
                  {result.message}
                </span>
              </div>
              {result.output && (
                <div className="p-3 rounded-lg bg-surface border border-border">
                  <p className="text-xs text-text-muted mb-1">Saída:</p>
                  <pre className="text-xs font-mono text-text-primary whitespace-pre-wrap">
                    {result.output}
                  </pre>
                </div>
              )}
              {result.new_achievements?.length > 0 && (
                <p className="text-sm text-brand-400">
                  Nova conquista desbloqueada!
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <XCircle size={20} className="text-danger" />
                <span className="font-semibold text-danger">
                  {result.error_type === 'SyntaxError'
                    ? 'Erro de sintaxe'
                    : result.error_type === 'WrongOutput'
                    ? 'Resultado incorreto'
                    : result.error_type === 'Timeout'
                    ? 'Tempo excedido'
                    : 'Erro na execução'}
                </span>
              </div>

              {result.error_message && (
                <div className="p-3 rounded-lg bg-surface border border-border">
                  <pre className="text-xs font-mono text-danger whitespace-pre-wrap">
                    {result.error_message}
                  </pre>
                </div>
              )}

              {result.expected !== undefined && result.got !== undefined && (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-surface border border-border">
                    <p className="text-text-muted mb-1">Esperado:</p>
                    <pre className="font-mono text-accent-400">
                      {result.expected}
                    </pre>
                  </div>
                  <div className="p-3 rounded-lg bg-surface border border-border">
                    <p className="text-text-muted mb-1">Recebido:</p>
                    <pre className="font-mono text-danger">{result.got}</pre>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2 p-3 rounded-lg bg-brand-500/5 border border-brand-500/20">
                <Lightbulb
                  size={14}
                  className="text-brand-500 shrink-0 mt-0.5"
                />
                <p className="text-xs text-brand-300">{result.hint}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}