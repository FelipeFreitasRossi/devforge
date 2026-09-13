import { BookOpen, Trophy, Clock, Target } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { DashboardOverview } from '../../services/api';

interface StatsGridProps {
  overview: DashboardOverview | null;
}

export function StatsGrid({ overview }: StatsGridProps) {
  const containerRef = useScrollAnimation<HTMLElement>({
    y: 30,
    duration: 0.6,
    stagger: 0.08,
  });

  const stats = [
    {
      icon: BookOpen,
      label: 'Módulos ativos',
      value: String(overview?.stats.active_modules ?? 0),
      accent: 'brand' as const,
    },
    {
      icon: Trophy,
      label: 'Concluídos',
      value: String(overview?.stats.completed_modules ?? 0),
      accent: 'accent' as const,
    },
    {
      icon: Clock,
      label: 'Horas de estudo',
      value: `${overview?.stats.study_hours ?? 0}h`,
      accent: 'brand' as const,
    },
    {
      icon: Target,
      label: 'Meta semanal',
      value: overview?.stats.weekly_goal_progress ?? '0/5',
      accent: 'accent' as const,
    },
  ];

  return (
    <section ref={containerRef}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isBrand = stat.accent === 'brand';

          return (
            <div
              key={stat.label}
              data-animate
              className="group p-4 md:p-5 rounded-xl border border-border bg-surface-elevated hover:border-border-strong transition-all duration-300"
            >
              <div
                className={`w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                  isBrand
                    ? 'bg-brand-500/10 border border-brand-500/30 group-hover:bg-brand-500/20'
                    : 'bg-accent-500/10 border border-accent-500/30 group-hover:bg-accent-500/20'
                }`}
              >
                <Icon
                  size={18}
                  className={isBrand ? 'text-brand-500' : 'text-accent-500'}
                />
              </div>
              <div className="text-xl md:text-2xl font-bold text-text-primary leading-none mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-text-muted">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}