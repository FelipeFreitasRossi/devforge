import { Play, ChevronRight, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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

  // Pega os 3 primeiros módulos que não estão completos
  const upNext = modules
    .filter((m) => m.status !== 'completed')
    .slice(0, 3);

  if (upNext.length === 0) {
    return null;
  }

  /**
   * Constrói a URL da lição baseada no progresso do módulo.
   * Se o módulo tem N lições concluídas, a próxima é a lição (N+1).
   * O ID segue o padrão `{moduleId}-{número com 2 dígitos}`.
   */
  const getNextLessonUrl = (module: DashboardModule) => {
    const nextLessonNumber = module.completed_lessons + 1;
    const lessonId = `${module.id}-${String(nextLessonNumber).padStart(2, '0')}`;
    return `/minha-area/curso/${module.id}/licao/${lessonId}`;
  };

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
        {upNext.map((module, index) => {
          const isFirst = index === 0;
          const isLocked = module.status === 'locked';

          if (isLocked) {
            return (
              <div
                key={module.id}
                data-animate
                className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-surface-elevated/50 opacity-60 cursor-not-allowed"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-bold bg-surface-overlay border border-border text-text-muted">
                  {module.id}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-semibold text-text-secondary truncate">
                    {module.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    Conclua o módulo anterior para desbloquear
                  </p>
                </div>
                <div className="shrink-0">
                  <Lock size={16} className="text-text-muted" />
                </div>
              </div>
            );
          }

          return (
            <Link
              key={module.id}
              to={getNextLessonUrl(module)}
              data-animate
              className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${
                isFirst
                  ? 'border-brand-500/40 bg-gradient-to-br from-brand-500/10 via-surface-elevated to-surface-elevated hover:border-brand-500/70 hover:shadow-glow'
                  : 'border-border bg-surface-elevated hover:border-brand-500/40'
              }`}
            >
              <div
                className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-bold transition-transform group-hover:scale-110 ${
                  isFirst
                    ? 'bg-brand-500/15 border border-brand-500/40 text-brand-500'
                    : 'bg-surface-overlay border border-border text-text-muted group-hover:text-brand-500 group-hover:border-brand-500/40'
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
                <div
                  className={`hidden sm:flex items-center gap-1.5 text-xs font-medium transition-colors ${
                    isFirst
                      ? 'text-brand-500'
                      : 'text-text-muted group-hover:text-brand-500'
                  }`}
                >
                  <Play size={12} className="fill-current" />
                  {module.completed_lessons > 0 ? 'Continuar' : 'Começar'}
                </div>
                <ChevronRight
                  size={18}
                  className={`transition-all duration-300 group-hover:translate-x-1 ${
                    isFirst
                      ? 'text-brand-500'
                      : 'text-text-muted group-hover:text-brand-500'
                  }`}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}