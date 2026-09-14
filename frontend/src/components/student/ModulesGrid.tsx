import { Link } from 'react-router-dom';
import { BookOpen, Lock, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { DashboardModule } from '../../services/api';

interface ModulesGridProps {
  modules: DashboardModule[];
}

function ModuleCard({ module }: { module: DashboardModule }) {
  const isCompleted = module.status === 'completed';
  const isInProgress = module.status === 'in_progress';
  const isLocked = module.status === 'locked';

  // Pega a primeira lição do módulo (para linkar)
  const firstLessonId = `${module.id}-01`;
  const lessonLink = `/minha-area/curso/${module.id}/licao/${firstLessonId}`;

  const cardContent = (
    <>
      <div className="flex items-start justify-between gap-4 mb-4">
        <span
          className={`text-2xl font-bold font-mono leading-none ${
            isLocked
              ? 'text-text-muted/40'
              : isInProgress
              ? 'text-brand-500/70'
              : 'text-accent-500/70'
          }`}
        >
          {module.id}
        </span>

        <div
          className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
            isLocked
              ? 'bg-surface-overlay'
              : isInProgress
              ? 'bg-brand-500/15 border border-brand-500/30'
              : 'bg-accent-500/15 border border-accent-500/30'
          }`}
        >
          {isLocked ? (
            <Lock size={14} className="text-text-muted" />
          ) : isCompleted ? (
            <CheckCircle2 size={14} className="text-accent-500" />
          ) : (
            <BookOpen size={14} className="text-brand-500" />
          )}
        </div>
      </div>

      <h3
        className={`text-base md:text-lg font-semibold mb-1.5 ${
          isLocked ? 'text-text-secondary' : 'text-text-primary'
        }`}
      >
        {module.title}
      </h3>
      <p className="text-sm text-text-secondary mb-4 line-clamp-2">
        {module.description}
      </p>

      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-text-muted mb-1.5">
          <span>
            {module.completed_lessons}/{module.lessons_count} aulas
          </span>
          <span className="font-mono">{module.progress_percent}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-surface-overlay overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              isInProgress
                ? 'bg-brand-500'
                : isCompleted
                ? 'bg-accent-500'
                : 'bg-border-strong'
            }`}
            style={{ width: `${module.progress_percent}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs text-text-muted">
          <Clock size={12} />
          {module.duration_hours}h
        </span>

        {!isLocked && (
          <span className="flex items-center gap-1 text-xs font-medium text-brand-500 group-hover:gap-2 transition-all">
            {isCompleted ? 'Revisar' : isInProgress ? 'Continuar' : 'Começar'}
            <ArrowRight size={12} />
          </span>
        )}
      </div>
    </>
  );

  const baseClasses = `group relative block p-5 md:p-6 rounded-xl border transition-all duration-300 ${
    isLocked
      ? 'border-border bg-surface-elevated/50 opacity-60 cursor-not-allowed'
      : isInProgress
      ? 'border-brand-500/40 bg-gradient-to-br from-brand-500/5 via-surface-elevated to-surface-elevated hover:border-brand-500/70 hover:-translate-y-1'
      : 'border-border bg-surface-elevated hover:border-brand-500/40 hover:-translate-y-1'
  }`;

  // Se bloqueado, não é clicável
  if (isLocked) {
    return (
      <article data-animate className={baseClasses}>
        {cardContent}
      </article>
    );
  }

  return (
    <Link to={lessonLink} data-animate className={baseClasses}>
      {cardContent}
    </Link>
  );
}

export function ModulesGrid({ modules }: ModulesGridProps) {
  const containerRef = useScrollAnimation<HTMLElement>({
    y: 30,
    duration: 0.6,
    stagger: 0.08,
  });

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons_count, 0);

  return (
    <section ref={containerRef}>
      <div className="flex items-center justify-between mb-4">
        <h2
          data-animate
          className="text-lg md:text-xl font-bold text-text-primary"
        >
          Sua trilha
        </h2>
        <span data-animate className="text-xs text-text-muted font-mono">
          {modules.length} módulos · {totalLessons} aulas
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </section>
  );
}