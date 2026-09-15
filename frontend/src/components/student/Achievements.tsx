import { Award, Zap, Target, Star, Lock, Trophy } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { DashboardAchievement } from '../../services/api';

interface AchievementsProps {
  achievements: DashboardAchievement[];
}

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
    y: 40,
    duration: 0.8,
    stagger: 0.08,
  });

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <section ref={containerRef}>
      <div className="flex items-center justify-between mb-5">
        <h2
          data-animate
          className="text-lg md:text-xl font-bold text-text-primary tracking-tight"
        >
          Conquistas
        </h2>
        <span
          data-animate
          className="text-xs text-text-muted font-mono bg-surface-elevated px-3 py-1 rounded-full border border-border"
        >
          {unlockedCount}/{achievements.length}
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((achievement) => {
          const Icon = ICON_MAP[achievement.id] || Award;
          const isBrand = achievement.accent === 'brand';
          const rgb = achievement.unlocked
            ? isBrand
              ? '245, 158, 11'
              : '59, 130, 246'
            : '113, 113, 122';

          return (
            <div
              key={achievement.id}
              data-animate
              className={`group relative p-5 rounded-2xl border text-center overflow-hidden transition-all duration-500 ${
                achievement.unlocked
                  ? isBrand
                    ? 'border-brand-500/40 bg-surface-elevated hover:-translate-y-1'
                    : 'border-accent-500/40 bg-surface-elevated hover:-translate-y-1'
                  : 'border-border bg-surface-elevated/40'
              }`}
            >
              {/* Glow nos desbloqueados */}
              {achievement.unlocked && (
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `
                      radial-gradient(
                        ellipse 100% 100% at 50% 0%,
                        rgba(${rgb}, 0.3) 0%,
                        rgba(${rgb}, 0.15) 30%,
                        rgba(${rgb}, 0.05) 60%,
                        transparent 85%
                      )
                    `,
                  }}
                />
              )}

              <div className="relative">
                <div
                  className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${
                    achievement.unlocked
                      ? isBrand
                        ? 'bg-brand-500/15 border border-brand-500/40 group-hover:scale-110 group-hover:bg-brand-500/25'
                        : 'bg-accent-500/15 border border-accent-500/40 group-hover:scale-110 group-hover:bg-accent-500/25'
                      : 'bg-surface-overlay border border-border'
                  }`}
                >
                  {achievement.unlocked ? (
                    <Icon
                      size={24}
                      className={isBrand ? 'text-brand-500' : 'text-accent-500'}
                    />
                  ) : (
                    <Lock size={18} className="text-text-muted" />
                  )}
                </div>

                <h3
                  className={`text-sm font-semibold mb-1.5 ${
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
            </div>
          );
        })}
      </div>
    </section>
  );
}