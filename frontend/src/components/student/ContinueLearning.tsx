import { Play, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { DashboardOverview } from '../../services/api';

interface ContinueLearningProps {
  overview: DashboardOverview | null;
}

export function ContinueLearning({ overview }: ContinueLearningProps) {
  const containerRef = useScrollAnimation<HTMLElement>({
    y: 40,
    duration: 0.8,
    stagger: 0.12,
  });

  const lesson = overview?.next_lesson;

  if (!lesson) {
    return (
      <section ref={containerRef}>
        <h2
          data-animate
          className="text-fluid-xl font-bold text-text-primary mb-5"
        >
          Continue aprendendo
        </h2>
        <div
          data-animate
          className="p-8 rounded-2xl border border-border bg-surface-elevated text-center"
        >
          <Sparkles size={32} className="text-brand-500 mx-auto mb-4" />
          <p className="text-text-primary font-semibold mb-1">
            Você concluiu tudo!
          </p>
          <p className="text-text-secondary text-sm">
            Novos módulos serão adicionados em breve.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef}>
      <div className="flex items-center justify-between mb-5">
        <h2
          data-animate
          className="text-fluid-xl font-bold text-text-primary tracking-tight"
        >
          Continue aprendendo
        </h2>
      </div>

      <div
        data-animate
        className="group relative rounded-2xl border border-brand-500/30 bg-gradient-to-br from-brand-500/10 via-surface-elevated to-surface-elevated overflow-hidden transition-all duration-500 hover:border-brand-500/60"
      >
        {/* Glow grande */}
        <div
          aria-hidden
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-40 blur-3xl pointer-events-none group-hover:opacity-60 transition-opacity duration-700"
          style={{
            background:
              'radial-gradient(circle, rgba(245, 158, 11, 0.5), transparent 70%)',
          }}
        />

        <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
          {/* Capa do módulo */}
          <div className="shrink-0 w-full md:w-52 h-32 md:h-36 rounded-2xl bg-surface border border-brand-500/20 flex items-center justify-center overflow-hidden relative group-hover:border-brand-500/40 transition-colors">
            <div
              aria-hidden
              className="absolute inset-0 opacity-20"
              style={{
                background:
                  'linear-gradient(135deg, rgba(245, 158, 11, 0.3) 0%, transparent 50%)',
              }}
            />
            <div className="text-center relative">
              <div className="w-14 h-14 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                <Play
                  size={20}
                  className="text-brand-500 fill-current ml-0.5"
                />
              </div>
              <span className="text-[10px] text-text-muted font-mono tracking-wider">
                {lesson.module_id} · {lesson.lesson_id}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              <span className="text-xs font-semibold text-brand-500 uppercase tracking-wider">
                Próxima aula
              </span>
            </div>

            <h3 className="text-fluid-xl md:text-fluid-2xl font-bold text-text-primary mb-2 tracking-tight">
              {lesson.lesson_title}
            </h3>

            <p className="text-sm md:text-base text-text-secondary mb-5 line-clamp-2">
              {lesson.module_title}
            </p>

            {/* Progresso */}
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs text-text-muted mb-2">
                <span>Progresso do módulo</span>
                <span className="font-mono font-semibold text-text-primary">
                  {lesson.progress_percent}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-surface-overlay overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-1000 relative overflow-hidden"
                  style={{ width: `${lesson.progress_percent}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted mb-6">
              <span className="flex items-center gap-1.5">
                <Clock size={12} />
                {lesson.duration_minutes} min
              </span>
              <span className="flex items-center gap-1.5">
                <Play size={12} />
                Vídeo + exercícios
              </span>
            </div>

            <Button size="lg" className="w-full sm:w-auto group/btn">
              Continuar aula
              <ChevronRight
                size={18}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}