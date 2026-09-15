import { Calendar, Mail, Shield } from 'lucide-react';

interface ProfileHeaderProps {
  name: string;
  email: string;
  createdAt: string | null;
  paid: boolean;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function formatDate(iso: string | null): string {
  if (!iso) return 'Data desconhecida';
  try {
    const date = new Date(iso);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return 'Data desconhecida';
  }
}

export function ProfileHeader({
  name,
  email,
  createdAt,
  paid,
}: ProfileHeaderProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-6 md:p-8">
      {/* Glow */}
      <div
        aria-hidden
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(245, 158, 11, 0.4), transparent 70%)',
        }}
      />

      <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar grande */}
        <div className="shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-brand-500/30 to-brand-600/10 border border-brand-500/40 flex items-center justify-center shadow-glow">
            <span className="text-2xl md:text-3xl font-bold text-brand-400 font-mono">
              {getInitials(name)}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
              {name}
            </h1>
            {paid && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-500 bg-brand-500/10 border border-brand-500/30 px-2.5 py-1 rounded-full">
                <Shield size={12} />
                Acesso Vitalício
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-text-secondary">
            <span className="inline-flex items-center gap-1.5">
              <Mail size={14} className="text-text-muted" />
              {email}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} className="text-text-muted" />
              Membro desde {formatDate(createdAt)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}