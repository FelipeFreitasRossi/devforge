import { Target, CheckCircle2, Flame } from 'lucide-react';
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
  const isComplete = remaining === 0 && done > 0;

  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysLeft = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;

  return (
    <section ref={containerRef} className="h-full">
      <div
        data-animate
        className={`relative h-full rounded-2xl border bg-[#0c0c0e] overflow-hidden p-6 ${
          isComplete ? 'border-emerald-500/25' : 'border-border'
        }`}
      >
        {/* Glow sutil */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isComplete
              ? 'radial-gradient(ellipse 90% 120% at 100% 100%, rgba(16, 185, 129, 0.14) 0%, transparent 65%)'
              : 'radial-gradient(ellipse 90% 120% at 100% 100%, rgba(139, 92, 246, 0.12) 0%, transparent 65%)',
          }}
        />

        <div className="relative flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {isComplete ? (
                  <CheckCircle2 size={12} className="text-emerald-500" />
                ) : (
                  <Target size={12} className="text-violet-500" />
                )}
                <span
                  className={`text-[10px] font-semibold uppercase tracking-widest ${
                    isComplete ? 'text-emerald-500' : 'text-violet-400'
                  }`}
                >
                  Meta semanal
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-text-primary leading-none tracking-tight">
                  {done}
                </span>
                <span className="text-sm text-text-muted">/{total}</span>
              </div>
            </div>

            {isComplete ? (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                <Flame size={11} className="text-emerald-500" />
                <span className="text-[11px] font-bold text-emerald-500 font-mono">
                  OK
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/25">
                <span className="text-[11px] font-bold text-violet-400 font-mono">
                  {percent}%
                </span>
              </div>
            )}
          </div>

          {/* Barra */}
          <div className="mb-4">
            <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  isComplete
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                    : 'bg-gradient-to-r from-violet-500 to-accent-500'
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {/* Mensagem */}
          <div className="mt-auto">
            <p
              className={`text-sm leading-relaxed ${
                isComplete ? 'text-emerald-400' : 'text-text-secondary'
              }`}
            >
              {isComplete
                ? 'Meta batida. Continue assim.'
                : remaining === 1
                ? 'Falta apenas 1 aula!'
                : `Faltam ${remaining} aulas.`}
            </p>

            {!isComplete && daysLeft > 0 && (
              <p className="text-xs text-text-muted mt-2">
                {daysLeft} {daysLeft === 1 ? 'dia restante' : 'dias restantes'}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}