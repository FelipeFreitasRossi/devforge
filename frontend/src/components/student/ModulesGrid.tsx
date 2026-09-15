import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Lock,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { DashboardModule } from '../../services/api';

interface ModulesGridProps {
  modules: DashboardModule[];
}

// Quantos módulos mostrar antes de "Ver mais"
const INITIAL_VISIBLE = 2;

function ModuleCard({ module }: { module: DashboardModule }) {
  const isCompleted = module.status === 'completed';
  const isInProgress = module.status === 'in_progress';
  const isLocked = module.status === 'locked';

  const firstLessonId = `${module.id}-01`;
  const lessonLink = `/minha-area/curso/${module.id}/licao/${firstLessonId}`;

  const rgb = isCompleted
    ? '16, 185, 129'
    : isInProgress
    ? '245, 158, 11'
    : '113, 113, 122';

  const cardContent = (
    <>
      <div
        aria-hidden
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isLocked ? 'opacity-0' : 'opacity-70 group-hover:opacity-100'
        }`}
        style={{
          background: `radial-gradient(ellipse 90% 90% at 100% 0%, rgba(${rgb}, 0.25) 0%, rgba(${rgb}, 0.12) 30%, rgba(${rgb}, 0.04) 60%, transparent 85%)`,
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4 mb-4">
          <span
            className={`text-2xl font-bold font-mono leading-none ${
              isLocked
                ? 'text-text-muted/40'
                : isInProgress
                ? 'text-brand-500/70'
                : 'text-emerald-500/70'
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
                : 'bg-emerald-500/15 border border-emerald-500/30'
            }`}
          >
            {isLocked ? (
              <Lock size={14} className="text-text-muted" />
            ) : isCompleted ? (
              <CheckCircle2 size={14} className="text-emerald-500" />
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
                  ? 'bg-emerald-500'
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
      </div>
    </>
  );

  const baseClasses = `group relative block p-5 md:p-6 rounded-2xl border overflow-hidden transition-all duration-500 ${
    isLocked
      ? 'border-border bg-surface-elevated/50 opacity-60 cursor-not-allowed'
      : isInProgress
      ? 'border-brand-500/40 bg-surface-elevated hover:-translate-y-1'
      : 'border-border bg-surface-elevated hover:border-emerald-500/40 hover:-translate-y-1'
  }`;

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
  const [showAll, setShowAll] = useState(false);

  const containerRef = useScrollAnimation<HTMLElement>({
    y: 30,
    duration: 0.6,
    stagger: 0.08,
  });

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons_count, 0);
  const hasMore = modules.length > INITIAL_VISIBLE;

  // No mobile, mostra só os primeiros; no desktop mostra todos
  const visibleModules = modules.slice(0, INITIAL_VISIBLE);
  const hiddenModules = modules.slice(INITIAL_VISIBLE);

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

      {/* ===== MOBILE: mostra só os 2 primeiros + botão ver mais ===== */}
      <div className="md:hidden">
        <div className="grid grid-cols-1 gap-4">
          {visibleModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>

        {hasMore && showAll && (
          <div className="grid grid-cols-1 gap-4 mt-4">
            {hiddenModules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        )}

        {hasMore && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-surface-elevated text-sm font-medium text-text-secondary hover:text-text-primary hover:border-border-strong transition-all"
          >
            {showAll ? (
              <>
                <ChevronUp size={16} />
                Ver menos
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                Ver mais {modules.length - INITIAL_VISIBLE}{' '}
                {modules.length - INITIAL_VISIBLE === 1
                  ? 'módulo'
                  : 'módulos'}
              </>
            )}
          </button>
        )}
      </div>

      {/* ===== DESKTOP: mostra todos ===== */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </section>
  );
}