import { Play, Clock, ChevronRight, BookOpen, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { DashboardOverview } from '../../services/api';
import { getDisplayNumberPadded } from '../../utils/lessonNumbers';

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
        <div
          data-animate
          className="relative rounded-2xl border border-emerald-500/25 bg-[#0c0c0e] overflow-hidden p-8 text-center"
        >
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
              <Sparkles size={22} className="text-emerald-500" />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-1">
              Você concluiu tudo!
            </h3>
            <p className="text-sm text-text-muted">
              Novos módulos serão adicionados em breve.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const lessonLink = `/minha-area/curso/${lesson.module_id}/licao/${lesson.lesson_id}`;

  return (
    <section ref={containerRef}>
      <div className="flex items-center justify-between mb-4">
        <h2
          data-animate
          className="text-lg md:text-xl font-bold text-text-primary tracking-tight"
        >
          Continue estudando
        </h2>
        <span
          data-animate
          className="text-xs text-text-muted uppercase tracking-widest font-medium"
        >
          Próxima aula
        </span>
      </div>

      <Link
        to={lessonLink}
        data-animate
        className="group block relative rounded-2xl border border-brand-500/25 bg-[#0c0c0e] overflow-hidden transition-all duration-500 hover:border-brand-500/50 hover:-translate-y-0.5"
      >
        {/* Glow âmbar no canto direito */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 140% at 100% 50%, rgba(245, 158, 11, 0.18) 0%, rgba(245, 158, 11, 0.05) 35%, transparent 65%)',
          }}
        />

        <div className="relative p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-6">
          {/* Capa */}
          <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Play size={22} className="text-brand-500 fill-current ml-0.5" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-mono text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded-md border border-brand-500/20">
                {lesson.module_id}-{getDisplayNumberPadded(lesson.lesson_id)}
              </span>
              <span className="text-xs text-text-muted">
                {lesson.module_title}
              </span>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-text-primary mb-3 tracking-tight truncate">
              {lesson.lesson_title}
            </h3>

            {/* Progresso inline */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-1.5 rounded-full bg-white/[0.04] overflow-hidden max-w-xs">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400"
                  style={{ width: `${lesson.progress_percent}%` }}
                />
              </div>
              <span className="text-xs font-mono text-brand-500 font-semibold">
                {lesson.progress_percent}%
              </span>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1.5">
                <Clock size={12} />
                {lesson.reading_time_minutes} min
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen size={12} />
                Leitura + exercício
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="shrink-0 flex items-center">
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-500 text-[#0a0a0a] text-sm font-bold group-hover:bg-brand-400 group-hover:gap-3 transition-all duration-300 shadow-[0_0_30px_-8px_rgba(245,158,11,0.5)] w-full md:w-auto justify-center">
              Continuar
              <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}