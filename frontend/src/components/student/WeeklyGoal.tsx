import { Target, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { DashboardOverview } from '../../services/api';

interface WeeklyGoalProps {
  overview: DashboardOverview | null;
}

export function WeeklyGoal({ overview }: WeeklyGoalProps) {
  const containerRef = useScrollAnimation<HTMLElement>({
    y: 30,
    duration: 0.6,
    stagger: 0.08,
  });

  const progressStr = overview?.stats.weekly_goal_progress ?? '0/5';
  const [done, total] = progressStr.split('/').map(Number);
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  const remaining = Math.max(total - done, 0);

  return (
    <section ref={containerRef} className="h-full">
      <div
        data-animate
        className="relative h-full rounded-xl border border-accent-500/30 bg-gradient-to-br from-accent-500/10 via-surface-elevated to-surface-elevated p-5 md:p-6 overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(59, 130, 246, 0.5), transparent 70%)',
          }}
        />

        <div className="relative flex items-start justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Target size={16} className="text-accent-500" />
              <span className="text-xs font-semibold text-accent-500 uppercase tracking-wider">
                Meta semanal
              </span>
            </div>
            <p className="text-text-secondary text-sm">
              {remaining === 0
                ? 'Meta batida! Você é fera.'
                : `Faltam ${remaining} ${
                    remaining === 1 ? 'aula' : 'aulas'
                  } para bater a meta.`}
            </p>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-500/15 border border-accent-500/30 shrink-0">
            <TrendingUp size={12} className="text-accent-500" />
            <span className="text-xs font-bold text-accent-500 font-mono">
              {percent}%
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between text-xs text-text-muted mb-2">
            <span>Progresso</span>
            <span className="font-mono">{progressStr}</span>
          </div>
          <div className="h-2 rounded-full bg-surface-overlay overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-500 to-brand-500 transition-all duration-1000"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}