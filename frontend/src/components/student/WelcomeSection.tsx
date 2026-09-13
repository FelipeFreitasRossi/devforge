import { Sparkles, Flame } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { DashboardOverview } from '../../services/api';

interface WelcomeSectionProps {
  overview: DashboardOverview | null;
}

export function WelcomeSection({ overview }: WelcomeSectionProps) {
  const containerRef = useScrollAnimation<HTMLElement>({
    y: 30,
    duration: 0.8,
    stagger: 0.1,
  });

  const firstName = overview?.user.name?.split(' ')[0] || 'dev';
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
  const streakDays = overview?.streak.current_days ?? 0;

  return (
    <section ref={containerRef} className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(245, 158, 11, 0.4), transparent 70%)',
        }}
      />

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div
            data-animate
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/5 mb-4"
          >
            <Sparkles size={12} className="text-brand-500" />
            <span className="text-xs text-brand-300 font-medium">
              Continue de onde parou
            </span>
          </div>

          <h1
            data-animate
            className="text-2xl md:text-4xl font-bold text-text-primary mb-2 tracking-tight"
          >
            {greeting}, {firstName}.
          </h1>
          <p
            data-animate
            className="text-text-secondary text-sm md:text-base max-w-xl"
          >
            Você está no caminho certo. Continue firme e conquiste mais um
            passo hoje.
          </p>
        </div>

        <div
          data-animate
          className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-surface-elevated shrink-0"
        >
          <div className="w-10 h-10 rounded-lg bg-brand-500/15 border border-brand-500/30 flex items-center justify-center">
            <Flame size={20} className="text-brand-500" />
          </div>
          <div>
            <div className="text-xl font-bold text-text-primary leading-none">
              {streakDays}
            </div>
            <div className="text-xs text-text-muted mt-0.5">
              {streakDays === 1 ? 'dia seguido' : 'dias seguidos'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}