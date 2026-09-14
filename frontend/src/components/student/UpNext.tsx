import { Play, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { DashboardModule } from '../../services/api';

interface UpNextProps {
  modules: DashboardModule[];
}

export function UpNext({ modules }: UpNextProps) {
  const containerRef = useScrollAnimation<HTMLElement>({
    y: 30,
    duration: 0.6,
    stagger: 0.08,
  });

  const upNext = modules
    .filter((m) => m.status !== 'completed')
    .slice(0, 3);

  if (upNext.length === 0) {
    return null;
  }

  return (
    <section ref={containerRef}>
      <div className="flex items-center justify-between mb-4">
        <h2
          data-animate
          className="text-lg md:text-xl font-bold text-text-primary"
        >
          Próximos passos
        </h2>
        <span data-animate className="text-xs text-text-muted font-mono">
          {upNext.length} pendentes
        </span>
      </div>

      <div className="space-y-3">
        {upNext.map((module, index) => (
          <div
            key={module.id}
            data-animate
            className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-surface-elevated hover:border-brand-500/40 transition-all duration-300 cursor-pointer"
          >
            <div
              className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-bold ${
                index === 0
                  ? 'bg-brand-500/15 border border-brand-500/40 text-brand-500'
                  : 'bg-surface-overlay border border-border text-text-muted'
              }`}
            >
              {module.id}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm md:text-base font-semibold text-text-primary truncate">
                {module.title}
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                {module.completed_lessons}/{module.lessons_count} aulas ·{' '}
                {module.progress_percent}% concluído
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-brand-500 font-medium">
                <Play size={12} className="fill-current" />
                {index === 0 ? 'Continuar' : 'Começar'}
              </div>
              <ChevronRight
                size={18}
                className="text-text-muted group-hover:text-brand-500 group-hover:translate-x-1 transition-all"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}