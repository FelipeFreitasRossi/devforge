import { useState } from 'react';
import { Save, X, Pencil, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface ProfileInfoProps {
  name: string;
  email: string;
  onSaveName: (name: string) => Promise<void>;
}

export function ProfileInfo({ name, email, onSaveName }: ProfileInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState(name);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setError('');
    const trimmed = draftName.trim();

    if (trimmed.length < 2) {
      setError('O nome deve ter pelo menos 2 caracteres');
      return;
    }

    if (trimmed === name) {
      setIsEditing(false);
      return;
    }

    setSaving(true);
    try {
      await onSaveName(trimmed);
      setSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setDraftName(name);
    setIsEditing(false);
    setError('');
  };

  return (
    <section>
      <h2 className="text-lg md:text-xl font-bold text-text-primary mb-4">
        Dados pessoais
      </h2>

      <div className="rounded-xl border border-border bg-surface-elevated p-5 md:p-6 space-y-5">
        {/* Nome */}
        <div>
          <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
            Nome completo
          </label>

          {isEditing ? (
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                disabled={saving}
                className="flex-1 px-4 py-2.5 rounded-lg bg-surface border border-border text-text-primary focus:outline-none focus:border-brand-500 transition-colors disabled:opacity-50"
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  size="md"
                  className="flex-1 sm:flex-none"
                >
                  {saving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Salvando
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Salvar
                    </>
                  )}
                </Button>
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="p-2.5 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors disabled:opacity-50"
                  aria-label="Cancelar"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-surface border border-border">
              <span className="text-text-primary truncate">{name}</span>
              <button
                onClick={() => setIsEditing(true)}
                className="shrink-0 inline-flex items-center gap-1.5 text-xs text-brand-500 hover:text-brand-400 font-medium transition-colors"
              >
                <Pencil size={12} />
                Editar
              </button>
            </div>
          )}

          {error && (
            <p className="text-xs text-danger mt-2">{error}</p>
          )}
          {success && (
            <p className="text-xs text-accent-500 mt-2 inline-flex items-center gap-1.5">
              <CheckCircle2 size={12} />
              Nome atualizado
            </p>
          )}
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
            Email
          </label>
          <div className="p-3 rounded-lg bg-surface border border-border text-text-muted">
            {email}
          </div>
          <p className="text-xs text-text-muted mt-2">
            O email não pode ser alterado.
          </p>
        </div>
      </div>
    </section>
  );
}