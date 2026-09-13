import { Play, Clock, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { DashboardOverview } from '../../services/api';

interface ContinueLearningProps {
  overview: DashboardOverview | null;
}

export function ContinueLearning({ overview }: ContinueLearningProps) {
  const containerRef = useScrollAnimation<HTMLElement>({
    y: 30,
    duration: 0.7,
    stagger: 0.1,
  });

  const lesson = overview?.next_lesson;

  if (!lesson) {
    return (
      <section ref={containerRef}>
        <h2
          data-animate
          className="text-lg md:text-xl font-bold text-text-primary mb-4"
        >
          Continue aprendendo
        </h2>
        <div
          data-animate
          className="p-6 rounded-2xl border border-border bg-surface-elevated text-center"
        >
          <p className="text-text-secondary text-sm">
            Você concluiu todas as aulas disponíveis. Novos módulos em breve.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef}>
      <div className="flex items-center justify-between mb-4">
        <h2
          data-animate
          className="text-lg md:text-xl font-bold text-text-primary"
        >
          Continue aprendendo
        </h2>
      </div>

      <div
        data-animate
        className="relative group rounded-2xl border border-brand-500/30 bg-gradient-to-br from-brand-500/10 via-surface-elevated to-surface-elevated p-5 md:p-8 overflow-hidden hover:border-brand-500/60 transition-colors duration-300"
      >
        <div
          aria-hidden
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(245, 158, 11, 0.5), transparent 70%)',
          }}
        />

        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          <div className="shrink-0 w-full md:w-48 h-28 md:h-32 rounded-xl bg-surface border border-border flex items-center justify-center overflow-hidden">
            <div className="text-center">
              <Play
                size={32}
                className="text-brand-500 mx-auto mb-1 fill-current"
              />
              <span className="text-xs text-text-muted font-mono">
                {lesson.module_id} · {lesson.lesson_id}
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <span className="inline-block text-xs font-semibold text-brand-500 uppercase tracking-wider mb-2">
              Próxima aula
            </span>
            <h3 className="text-lg md:text-xl font-bold text-text-primary mb-2">
              {lesson.lesson_title}
            </h3>
            <p className="text-sm text-text-secondary mb-4 line-clamp-2">
              {lesson.module_title}
            </p>

            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-text-muted mb-1.5">
                <span>Progresso do módulo</span>
                <span className="font-mono">{lesson.progress_percent}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-surface-overlay overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand-500 transition-all duration-700"
                  style={{ width: `${lesson.progress_percent}%` }}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted mb-5">
              <span className="flex items-center gap-1.5">
                <Clock size={12} />
                {lesson.duration_minutes} min
              </span>
            </div>

            <Button size="md" className="w-full sm:w-auto">
              Continuar aula
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}