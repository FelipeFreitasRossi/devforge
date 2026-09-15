import { Sparkles, Flame } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { DashboardOverview } from '../../services/api';

interface WelcomeSectionProps {
  overview: DashboardOverview | null;
}

export function WelcomeSection({ overview }: WelcomeSectionProps) {
  const containerRef = useScrollAnimation<HTMLElement>({
    y: 20,
    duration: 0.7,
    stagger: 0.1,
  });

  const firstName = overview?.user.name?.split(' ')[0] || 'dev';
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
  const streakDays = overview?.streak.current_days ?? 0;
  const isHotStreak = streakDays >= 3;

  return (
    <section ref={containerRef}>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-[#0c0c0e] p-6 md:p-8">
        {/* Glow âmbar no canto direito */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 120% at 100% 50%, rgba(245, 158, 11, 0.14) 0%, rgba(245, 158, 11, 0.04) 30%, transparent 65%)',
          }}
        />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Texto */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} className="text-brand-500" />
              <span className="text-xs font-medium text-brand-400 uppercase tracking-wider">
                {greeting}
              </span>
            </div>

            <h1
              data-animate
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-3 tracking-tight leading-[1.15]"
            >
              Olá,{' '}
              <span className="bg-gradient-to-r from-brand-300 via-brand-500 to-brand-600 bg-clip-text text-transparent">
                {firstName}
              </span>
              .
            </h1>

            <p
              data-animate
              className="text-text-secondary text-sm md:text-base leading-relaxed max-w-xl"
            >
              {streakDays > 0
                ? `Você está em uma sequência de ${streakDays} ${
                    streakDays === 1 ? 'dia' : 'dias'
                  }. Continue firme!`
                : 'Comece hoje seus estudos. A consistência é o que separa quem aprende de quem desiste.'}
            </p>
          </div>

          {/* Streak */}
          <div
            data-animate
            className={`shrink-0 flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-500 ${
              isHotStreak
                ? 'border-brand-500/40 bg-gradient-to-br from-brand-500/15 to-[#0c0c0e]'
                : 'border-border bg-[#0a0a0c]'
            }`}
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                isHotStreak
                  ? 'bg-brand-500/20 border border-brand-500/40'
                  : 'bg-surface-overlay border border-border'
              }`}
            >
              <Flame
                size={20}
                className={`text-brand-500 ${isHotStreak ? 'animate-pulse' : ''}`}
                fill={isHotStreak ? 'currentColor' : 'none'}
              />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary leading-none tracking-tight">
                {streakDays}
              </div>
              <div className="text-[10px] text-text-muted mt-1 uppercase tracking-widest font-medium">
                {streakDays === 1 ? 'dia' : 'dias'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}