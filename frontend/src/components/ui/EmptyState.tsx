import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

/** Estado vazio padrão: ícone + título + explicação curta do que fazer. */
export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-overlay">
        <Icon size={22} className="text-text-muted" aria-hidden="true" />
      </div>
      <div>
        <p className="text-fluid-sm font-medium text-text-primary">{title}</p>
        <p className="mt-1 text-xs text-text-muted">{description}</p>
      </div>
    </div>
  );
}
