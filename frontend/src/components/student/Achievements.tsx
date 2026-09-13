import { Award, Zap, Target, Star, Lock, Trophy } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { DashboardAchievement } from '../../services/api';

interface AchievementsProps {
  achievements: DashboardAchievement[];
}

// Mapeamento de ID de conquista para ícone
const ICON_MAP: Record<string, typeof Award> = {
  first_lesson: Zap,
  streak_3: Target,
  streak_7: Star,
  module_complete: Award,
  '10_hours': Trophy,
  all_modules: Trophy,
};

export function Achievements({ achievements }: AchievementsProps) {
  const containerRef = useScrollAnimation<HTMLElement>({
    y: 30,
    duration: 0.6,
    stagger: 0.08,
  });

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <section ref={containerRef}>
      <div className="flex items-center justify-between mb-4">
        <h2
          data-animate
          className="text-lg md:text-xl font-bold text-text-primary"
        >
          Conquistas
        </h2>
        <span data-animate className="text-xs text-text-muted font-mono">
          {unlockedCount}/{achievements.length} desbloqueadas
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {achievements.map((achievement) => {
          const Icon = ICON_MAP[achievement.id] || Award;
          const isBrand = achievement.accent === 'brand';

          return (
            <div
              key={achievement.id}
              data-animate
              className={`p-4 rounded-xl border text-center transition-all duration-300 ${
                achievement.unlocked
                  ? isBrand
                    ? 'border-brand-500/40 bg-brand-500/5 hover:border-brand-500/60'
                    : 'border-accent-500/40 bg-accent-500/5 hover:border-accent-500/60'
                  : 'border-border bg-surface-elevated/50 opacity-50'
              }`}
            >
              <div
                className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3 ${
                  achievement.unlocked
                    ? isBrand
                      ? 'bg-brand-500/15 border border-brand-500/40'
                      : 'bg-accent-500/15 border border-accent-500/40'
                    : 'bg-surface-overlay border border-border'
                }`}
              >
                {achievement.unlocked ? (
                  <Icon
                    size={20}
                    className={
                      isBrand ? 'text-brand-500' : 'text-accent-500'
                    }
                  />
                ) : (
                  <Lock size={16} className="text-text-muted" />
                )}
              </div>
              <h3
                className={`text-sm font-semibold mb-1 ${
                  achievement.unlocked
                    ? 'text-text-primary'
                    : 'text-text-secondary'
                }`}
              >
                {achievement.title}
              </h3>
              <p className="text-xs text-text-muted leading-snug">
                {achievement.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}