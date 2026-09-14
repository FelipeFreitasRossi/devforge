import { useEffect, useRef, useState } from 'react';
import { Flame } from 'lucide-react';
import type { DashboardOverview } from '../../services/api';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface HeroSectionProps {
  overview: DashboardOverview;
}

/**
 * Devolve "Bom dia", "Boa tarde" ou "Boa noite" de acordo com a hora atual.
 */
function getSaudacao(): string {
  const hora = new Date().getHours();
  if (hora < 12) return 'Bom dia';
  if (hora < 18) return 'Boa tarde';
  return 'Boa noite';
}

export function HeroSection({ overview }: HeroSectionProps) {
  const sectionRef = useScrollAnimation<HTMLDivElement>();
  const primeiroNome = overview.user.name.split(' ')[0];
  const saudacao = getSaudacao();

  // O backend pode não mandar esse número ainda — enquanto isso,
  // calculamos uma aproximação a partir dos módulos ativos/concluídos.
  const progressoGeral =
    overview.stats.overall_progress_percent ??
    Math.round(
      (overview.stats.completed_modules /
        Math.max(
          1,
          overview.stats.completed_modules + overview.stats.active_modules
        )) *
        100
    );

  return (
    <section
      ref={sectionRef}
      data-animate
      className="card-base relative overflow-hidden p-6 md:p-10"
    >
      {/* brilho decorativo de fundo, bem discreto */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: 'var(--color-brand-500)' }}
      />

      <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        {/* Texto de saudação */}
        <div className="max-w-xl">
          <p className="text-fluid-sm text-text-secondary">
            {saudacao}, {primeiroNome}.
          </p>
          <h1 className="mt-1 text-fluid-3xl font-semibold text-text-primary">
            Vamos continuar de onde você parou
          </h1>

          {overview.streak.current_days > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5">
              <Flame
                size={16}
                className={
                  overview.streak.current_days >= 3
                    ? 'text-brand-500 animate-glow-pulse'
                    : 'text-brand-500'
                }
                aria-hidden="true"
              />
              <span className="text-fluid-sm text-text-secondary">
                {overview.streak.current_days}{' '}
                {overview.streak.current_days === 1 ? 'dia' : 'dias'} seguidos
                estudando
              </span>
            </div>
          )}
        </div>

        {/* Anel de progresso geral */}
        <ProgressRing percent={progressoGeral} />
      </div>
    </section>
  );
}

function ProgressRing({ percent }: { percent: number }) {
  const [displayPercent, setDisplayPercent] = useState(0);
  const size = 148;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayPercent / 100) * circumference;
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    // pequeno atraso para o anel "desenhar" ao entrar na tela
    const timeout = setTimeout(() => setDisplayPercent(percent), 150);
    return () => clearTimeout(timeout);
  }, [percent]);

  return (
    <div
      className="relative shrink-0"
      role="img"
      aria-label={`Progresso geral do curso: ${percent}%`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="progress-ring-track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          className="progress-ring-fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-fluid-2xl font-semibold text-text-primary">
          {displayPercent}%
        </span>
        <span className="text-xs text-text-muted">concluído</span>
      </div>
    </div>
  );
}
