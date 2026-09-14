import { Sparkles, Flame } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { DashboardOverview } from '../../services/api';

interface WelcomeSectionProps {
  overview: DashboardOverview | null;
}

export function WelcomeSection({ overview }: WelcomeSectionProps) {
  const containerRef = useScrollAnimation<HTMLElement>({
    y: 30,
    duration: 1,
    stagger: 0.15,
  });

  const firstName = overview?.user.name?.split(' ')[0] || 'dev';
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
  const streakDays = overview?.streak.current_days ?? 0;
  const isHotStreak = streakDays >= 3;

  return (
    <section ref={containerRef} className="relative overflow-hidden">
      {/* Glow âmbar de fundo */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(245, 158, 11, 0.5), transparent 70%)',
        }}
      />

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="flex-1">
          <div
            data-animate
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/5 mb-5"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-500" />
            </span>
            <span className="text-xs text-brand-300 font-medium">
              Continue de onde parou
            </span>
          </div>

          <h1
            data-animate
            className="text-fluid-3xl md:text-fluid-4xl font-bold text-text-primary mb-3 tracking-tight leading-[1.1]"
          >
            {greeting},{' '}
            <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
              {firstName}
            </span>
            .
          </h1>

          <p
            data-animate
            className="text-text-secondary text-sm md:text-base max-w-xl leading-relaxed"
          >
            {streakDays > 0
              ? `Você está em uma sequência de ${streakDays} ${
                  streakDays === 1 ? 'dia' : 'dias'
                }. Continue firme — a consistência é o que separa quem aprende de quem desiste.`
              : 'Comece hoje seus estudos. A consistência é o que separa quem aprende de quem desiste.'}
          </p>
        </div>

        {/* Streak card */}
        <div
          data-animate
          className={`relative flex items-center gap-4 px-5 py-4 rounded-2xl border shrink-0 transition-all duration-500 hover:scale-105 ${
            isHotStreak
              ? 'border-brand-500/40 bg-gradient-to-br from-brand-500/10 to-surface-elevated shadow-glow'
              : 'border-border bg-surface-elevated'
          }`}
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center relative ${
              isHotStreak
                ? 'bg-brand-500/20 border border-brand-500/40'
                : 'bg-brand-500/10 border border-brand-500/30'
            }`}
          >
            <Flame
              size={24}
              className={`text-brand-500 ${
                isHotStreak ? 'animate-pulse' : ''
              }`}
              fill={isHotStreak ? 'currentColor' : 'none'}
            />
          </div>
          <div>
            <div className="text-3xl font-bold text-text-primary leading-none tracking-tight">
              {streakDays}
            </div>
            <div className="text-xs text-text-muted mt-1 font-medium">
              {streakDays === 1 ? 'dia seguido' : 'dias seguidos'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}