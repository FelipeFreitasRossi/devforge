import { BookOpen, Trophy, Clock, Flame } from 'lucide-react';
import type { ProfileStats as StatsType } from '../../services/api';

interface ProfileStatsProps {
  stats: StatsType;
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  const items = [
    {
      icon: BookOpen,
      label: 'Módulos ativos',
      value: String(stats.active_modules),
      accent: 'brand' as const,
    },
    {
      icon: Trophy,
      label: 'Módulos concluídos',
      value: String(stats.completed_modules),
      accent: 'accent' as const,
    },
    {
      icon: Clock,
      label: 'Horas de estudo',
      value: `${stats.study_hours}h`,
      accent: 'brand' as const,
    },
    {
      icon: Flame,
      label: 'Dias seguidos',
      value: String(stats.streak_current),
      accent: 'accent' as const,
    },
  ];

  return (
    <section>
      <h2 className="text-lg md:text-xl font-bold text-text-primary mb-4">
        Seu progresso
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isBrand = item.accent === 'brand';
          return (
            <div
              key={item.label}
              className={`p-4 md:p-5 rounded-xl border bg-surface-elevated transition-colors ${
                isBrand
                  ? 'border-brand-500/20 hover:border-brand-500/40'
                  : 'border-accent-500/20 hover:border-accent-500/40'
              }`}
            >
              <div
                className={`w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center mb-3 ${
                  isBrand
                    ? 'bg-brand-500/10 border border-brand-500/30'
                    : 'bg-accent-500/10 border border-accent-500/30'
                }`}
              >
                <Icon
                  size={18}
                  className={isBrand ? 'text-brand-500' : 'text-accent-500'}
                />
              </div>
              <div className="text-xl md:text-2xl font-bold text-text-primary leading-none mb-1">
                {item.value}
              </div>
              <div className="text-xs md:text-sm text-text-muted">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Conquistas */}
      <div className="mt-4 p-4 md:p-5 rounded-xl border border-border bg-surface-elevated">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-text-primary">
            Conquistas desbloqueadas
          </span>
          <span className="text-sm font-mono text-brand-500">
            {stats.achievements_unlocked}/{stats.achievements_total}
          </span>
        </div>
        <div className="h-2 rounded-full bg-surface-overlay overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-1000"
            style={{
              width: `${
                stats.achievements_total > 0
                  ? (stats.achievements_unlocked / stats.achievements_total) * 100
                  : 0
              }%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}