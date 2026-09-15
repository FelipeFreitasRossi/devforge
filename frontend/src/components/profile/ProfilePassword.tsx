import { useState } from 'react';
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../ui/Button';

interface ProfilePasswordProps {
  onChangePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
}

export function ProfilePassword({ onChangePassword }: ProfilePasswordProps) {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const reset = () => {
    setCurrent('');
    setNewPass('');
    setConfirm('');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (newPass.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (newPass !== confirm) {
      setError('As senhas não coincidem');
      return;
    }

    if (current === newPass) {
      setError('A nova senha deve ser diferente da atual');
      return;
    }

    setSaving(true);
    try {
      await onChangePassword(current, newPass);
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao alterar senha');
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-500 transition-colors pr-11';

  return (
    <section>
      <h2 className="text-lg md:text-xl font-bold text-text-primary mb-4">
        Segurança
      </h2>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-border bg-surface-elevated p-5 md:p-6 space-y-4"
      >
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <Lock size={16} className="text-brand-500" />
          <span className="text-sm font-medium text-text-primary">
            Alterar senha
          </span>
        </div>

        {/* Senha atual */}
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-2">
            Senha atual
          </label>
          <div className="relative">
            <input
              type={showCurrent ? 'text' : 'password'}
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="Digite sua senha atual"
              className={inputClass}
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
              aria-label={showCurrent ? 'Ocultar' : 'Mostrar'}
            >
              {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Nova senha */}
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-2">
            Nova senha
          </label>
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              className={inputClass}
              required
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
              aria-label={showNew ? 'Ocultar' : 'Mostrar'}
            >
              {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Confirmar */}
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-2">
            Confirmar nova senha
          </label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repita a nova senha"
            className={inputClass}
            required
          />
        </div>

        {/* Feedback */}
        {error && (
          <div className="p-3 rounded-lg bg-danger/10 border border-danger/30 flex items-start gap-2">
            <AlertCircle size={14} className="text-danger shrink-0 mt-0.5" />
            <p className="text-danger text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="p-3 rounded-lg bg-accent-500/10 border border-accent-500/30 flex items-start gap-2">
            <CheckCircle2
              size={14}
              className="text-accent-500 shrink-0 mt-0.5"
            />
            <p className="text-accent-500 text-sm">Senha alterada com sucesso</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={saving || !current || !newPass || !confirm}
          className="w-full sm:w-auto"
        >
          {saving ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Alterando
            </>
          ) : (
            'Alterar senha'
          )}
        </Button>
      </form>
    </section>
  );
}