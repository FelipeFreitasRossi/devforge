import { TrendingUp, Calendar } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { WeeklyActivity as WeeklyActivityType } from '../../services/api';

interface WeeklyActivityProps {
  activity: WeeklyActivityType[];
}

export function WeeklyActivity({ activity }: WeeklyActivityProps) {
  const containerRef = useScrollAnimation<HTMLElement>({
    y: 30,
    duration: 0.6,
    stagger: 0.08,
  });

  const maxMinutes = Math.max(...activity.map((a) => a.minutes), 30);
  const totalMinutes = activity.reduce((acc, a) => acc + a.minutes, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);
  const today = new Date().toISOString().split('T')[0];
  const activeDays = activity.filter((a) => a.minutes > 0).length;

  return (
    <section ref={containerRef} className="h-full">
      <div
        data-animate
        className="relative h-full rounded-2xl border border-border bg-[#0c0c0e] overflow-hidden p-6"
      >
        <div className="relative">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={12} className="text-text-muted" />
                <span className="text-[10px] font-semibold text-text-muted uppercase tracking-widest">
                  Sua semana
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-text-primary leading-none tracking-tight">
                  {totalHours}
                </span>
                <span className="text-sm text-text-muted">horas</span>
              </div>
            </div>

            {totalMinutes > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-500/10 border border-accent-500/25">
                <TrendingUp size={11} className="text-accent-500" />
                <span className="text-[11px] font-bold text-accent-400 font-mono">
                  {activeDays}/7
                </span>
              </div>
            )}
          </div>

          {/* Gráfico */}
          <div className="flex items-end justify-between gap-1.5 h-24">
            {activity.map((day) => {
              const height =
                maxMinutes > 0 ? (day.minutes / maxMinutes) * 100 : 0;
              const isToday = day.date === today;
              const hasActivity = day.minutes > 0;

              return (
                <div
                  key={day.date}
                  className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
                >
                  <div className="relative w-full flex justify-center">
                    {hasActivity && (
                      <span className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-accent-400 whitespace-nowrap pointer-events-none">
                        {day.minutes}min
                      </span>
                    )}
                    <div
                      className={`w-full max-w-[28px] rounded-t-md transition-all duration-500 ${
                        isToday
                          ? 'bg-gradient-to-t from-accent-500 to-accent-400'
                          : hasActivity
                          ? 'bg-accent-500/40 group-hover:bg-accent-500/60'
                          : 'bg-white/[0.04]'
                      }`}
                      style={{
                        height: `${Math.max(height, 4)}%`,
                        minHeight: '4px',
                      }}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-medium transition-colors ${
                      isToday
                        ? 'text-accent-500 font-bold'
                        : 'text-text-muted group-hover:text-text-secondary'
                    }`}
                  >
                    {day.weekday}
                  </span>
                </div>
              );
            })}
          </div>

          {totalMinutes === 0 && (
            <p className="text-center text-xs text-text-muted mt-5 pt-5 border-t border-border">
              Comece a estudar hoje para ver sua evolução.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}