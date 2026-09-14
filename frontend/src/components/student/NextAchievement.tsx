import { Lock } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { DashboardAchievement } from '../../services/api';

interface NextAchievementProps {
  achievement: DashboardAchievement | null;
}

export function NextAchievement({ achievement }: NextAchievementProps) {
  const sectionRef = useScrollAnimation<HTMLDivElement>();

  if (!achievement) return null;

  const progresso = achievement.progress_percent ?? 0;

  return (
    <div
      ref={sectionRef}
      data-animate
      className="card-base hover-lift p-6"
    >
      <p className="text-fluid-sm text-text-muted">Próxima conquista</p>

      <div className="mt-3 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface-overlay">
          <Lock size={22} className="text-text-muted" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h4 className="truncate text-fluid-base font-semibold text-text-primary">
            {achievement.title}
          </h4>
          <p className="truncate text-fluid-sm text-text-secondary">
            {achievement.description}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-xs text-text-muted">
          <span>Faltam pouco para desbloquear</span>
          <span className="tabular-nums">{progresso}%</span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-surface-overlay"
          role="progressbar"
          aria-valuenow={progresso}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-500 to-brand-500 transition-all duration-700"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>
    </div>
  );
}
