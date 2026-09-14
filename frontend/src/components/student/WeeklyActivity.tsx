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

  return (
    <section ref={containerRef}>
      <div className="flex items-center justify-between mb-4">
        <h2
          data-animate
          className="text-lg md:text-xl font-bold text-text-primary"
        >
          Sua semana
        </h2>
        <span data-animate className="text-xs text-text-muted font-mono">
          {totalHours}h estudadas
        </span>
      </div>

      <div
        data-animate
        className="p-5 md:p-6 rounded-xl border border-border bg-surface-elevated"
      >
        <div className="flex items-end justify-between gap-2 md:gap-3 h-32 md:h-40">
          {activity.map((day) => {
            const height =
              maxMinutes > 0 ? (day.minutes / maxMinutes) * 100 : 0;
            const isToday =
              day.date === new Date().toISOString().split('T')[0];

            return (
              <div
                key={day.date}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
              >
                <div className="relative w-full flex justify-center">
                  <div
                    className={`w-full max-w-[40px] rounded-t-md transition-all duration-700 ${
                      isToday
                        ? 'bg-brand-500'
                        : day.minutes > 0
                        ? 'bg-brand-500/60'
                        : 'bg-surface-overlay'
                    }`}
                    style={{
                      height: `${Math.max(height, 4)}%`,
                      minHeight: '4px',
                    }}
                  />
                </div>
                <span
                  className={`text-xs font-medium ${
                    isToday ? 'text-brand-500' : 'text-text-muted'
                  }`}
                >
                  {day.weekday}
                </span>
              </div>
            );
          })}
        </div>

        {totalMinutes === 0 && (
          <p className="text-center text-sm text-text-muted mt-6">
            Comece a estudar hoje para ver sua evolução aqui.
          </p>
        )}
      </div>
    </section>
  );
}