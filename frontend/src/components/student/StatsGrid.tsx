import { BookOpen, Trophy, Clock, Target } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useCountUp } from '../../hooks/useCountUp';
import type { DashboardOverview } from '../../services/api';

interface StatsGridProps {
  overview: DashboardOverview | null;
}

type Accent = 'amber' | 'emerald' | 'blue' | 'violet';

const CONFIG: Record<Accent, { rgb: string; icon: string; border: string }> = {
  amber: { rgb: '245, 158, 11', icon: 'text-brand-500', border: 'border-brand-500/25' },
  emerald: { rgb: '16, 185, 129', icon: 'text-emerald-500', border: 'border-emerald-500/25' },
  blue: { rgb: '59, 130, 246', icon: 'text-accent-500', border: 'border-accent-500/25' },
  violet: { rgb: '139, 92, 246', icon: 'text-violet-500', border: 'border-violet-500/25' },
};

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string;
  accent: Accent;
}) {
  const cfg = CONFIG[accent];
  const numValue = parseFloat(value.replace(/[^\d.]/g, '')) || 0;
  const suffix = value.replace(/[\d.]/g, '');
  const { value: animated, elementRef } = useCountUp(numValue);

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      data-animate
      className={`group relative p-5 rounded-2xl border ${cfg.border} bg-[#0c0c0e] overflow-hidden transition-all duration-300 hover:-translate-y-0.5`}
    >
      {/* Glow sutil no canto direito */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(ellipse 90% 100% at 100% 0%, rgba(${cfg.rgb}, 0.15) 0%, rgba(${cfg.rgb}, 0.05) 35%, transparent 70%)`,
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-10 h-10 rounded-xl bg-white/[0.03] border ${cfg.border} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
            <Icon size={18} className={cfg.icon} />
          </div>
        </div>

        <div className="text-2xl md:text-3xl font-bold text-text-primary leading-none mb-2 tracking-tight">
          {animated}
          {suffix}
        </div>
        <div className="text-[11px] md:text-xs text-text-muted uppercase tracking-wider font-medium">
          {label}
        </div>
      </div>
    </div>
  );
}

export function StatsGrid({ overview }: StatsGridProps) {
  const containerRef = useScrollAnimation<HTMLElement>({
    y: 20,
    duration: 0.6,
    stagger: 0.08,
  });

  const stats = [
    {
      icon: BookOpen,
      label: 'Módulos ativos',
      value: String(overview?.stats.active_modules ?? 0),
      accent: 'amber' as Accent,
    },
    {
      icon: Trophy,
      label: 'Concluídos',
      value: String(overview?.stats.completed_modules ?? 0),
      accent: 'emerald' as Accent,
    },
    {
      icon: Clock,
      label: 'Horas estudadas',
      value: `${Math.round(overview?.stats.study_hours ?? 0)}h`,
      accent: 'blue' as Accent,
    },
    {
      icon: Target,
      label: 'Meta semanal',
      value: overview?.stats.weekly_goal_progress ?? '0/5',
      accent: 'violet' as Accent,
    },
  ];

  return (
    <section ref={containerRef}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}