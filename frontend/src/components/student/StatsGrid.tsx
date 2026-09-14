import { BookOpen, Trophy, Clock, Target, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useCountUp } from '../../hooks/useCountUp';
import type { DashboardOverview } from '../../services/api';

interface StatsGridProps {
  overview: DashboardOverview | null;
}

function StatCard({
  icon: Icon,
  label,
  value,
  suffix = '',
  accent,
  trend,
}: {
  icon: typeof BookOpen;
  label: string;
  value: number;
  suffix?: string;
  accent: 'brand' | 'accent';
  trend?: string;
}) {
  const { value: animated, elementRef } = useCountUp(value);
  const isBrand = accent === 'brand';

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      data-animate
      className={`group relative p-5 md:p-6 rounded-2xl border bg-surface-elevated overflow-hidden transition-all duration-500 hover:-translate-y-1 ${
        isBrand
          ? 'border-brand-500/20 hover:border-brand-500/50'
          : 'border-accent-500/20 hover:border-accent-500/50'
      }`}
    >
      {/* Glow no hover */}
      <div
        aria-hidden
        className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl pointer-events-none"
        style={{
          background: isBrand
            ? 'radial-gradient(circle, rgba(245, 158, 11, 0.35), transparent 70%)'
            : 'radial-gradient(circle, rgba(59, 130, 246, 0.35), transparent 70%)',
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isBrand
                ? 'bg-brand-500/10 border border-brand-500/30 group-hover:bg-brand-500/20 group-hover:scale-110'
                : 'bg-accent-500/10 border border-accent-500/30 group-hover:bg-accent-500/20 group-hover:scale-110'
            }`}
          >
            <Icon
              size={20}
              className={isBrand ? 'text-brand-500' : 'text-accent-500'}
            />
          </div>

          {trend && (
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                isBrand
                  ? 'bg-brand-500/10 text-brand-400'
                  : 'bg-accent-500/10 text-accent-300'
              }`}
            >
              <TrendingUp size={10} />
              {trend}
            </span>
          )}
        </div>

        <div className="text-2xl md:text-3xl font-bold text-text-primary leading-none mb-1.5 tracking-tight">
          {animated}
          {suffix}
        </div>
        <div className="text-xs md:text-sm text-text-muted">{label}</div>
      </div>
    </div>
  );
}

export function StatsGrid({ overview }: StatsGridProps) {
  const containerRef = useScrollAnimation<HTMLElement>({
    y: 40,
    duration: 0.8,
    stagger: 0.1,
  });

  const stats = [
    {
      icon: BookOpen,
      label: 'Módulos ativos',
      value: overview?.stats.active_modules ?? 0,
      accent: 'brand' as const,
    },
    {
      icon: Trophy,
      label: 'Módulos concluídos',
      value: overview?.stats.completed_modules ?? 0,
      accent: 'accent' as const,
    },
    {
      icon: Clock,
      label: 'Horas de estudo',
      value: Math.round(overview?.stats.study_hours ?? 0),
      suffix: 'h',
      accent: 'brand' as const,
    },
    {
      icon: Target,
      label: 'Meta semanal',
      value: Number(
        overview?.stats.weekly_goal_progress?.split('/')[0] ?? 0
      ),
      suffix: `/${
        overview?.stats.weekly_goal_progress?.split('/')[1] ?? 5
      }`,
      accent: 'accent' as const,
    },
  ];

  return (
    <section ref={containerRef}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}