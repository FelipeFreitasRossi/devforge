import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Circle,
  Lock,
  ChevronDown,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import type { LessonSidebarModule } from '../../services/api';

interface LessonSidebarProps {
  sidebar: LessonSidebarModule[];
  currentLessonId: string;
}

function LessonItem({
  lesson,
  currentLessonId,
}: {
  lesson: LessonSidebarModule['lessons'][0];
  currentLessonId: string;
}) {
  const isCurrent = lesson.status === 'current';
  const isCompleted = lesson.status === 'completed';
  const isLocked = lesson.status === 'locked';

  const baseClass = `flex items-start gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
    isCurrent
      ? 'bg-brand-500/15 border border-brand-500/40 text-brand-400 font-medium'
      : isCompleted
      ? 'text-text-secondary hover:bg-surface-elevated'
      : isLocked
      ? 'text-text-muted/50 cursor-not-allowed'
      : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'
  }`;

  const content = (
    <>
      <span className="shrink-0 mt-0.5">
        {isCompleted ? (
          <CheckCircle2 size={14} className="text-accent-500" />
        ) : isLocked ? (
          <Lock size={12} className="text-text-muted/50" />
        ) : isCurrent ? (
          <Circle size={12} className="fill-brand-500 text-brand-500" />
        ) : (
          <Circle size={12} className="text-text-muted" />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate">{lesson.title}</p>
        <span className="text-[10px] text-text-muted font-mono">
          {lesson.reading_time_minutes} min
        </span>
      </div>
    </>
  );

  if (isLocked) {
    return <div className={baseClass}>{content}</div>;
  }

  return (
    <Link
      to={`/minha-area/curso/${lesson.id.split('-')[0]}/licao/${lesson.id}`}
      className={baseClass}
    >
      {content}
    </Link>
  );
}

export function LessonSidebar({ sidebar, currentLessonId }: LessonSidebarProps) {
  const currentModuleId = currentLessonId.split('-')[0];
  const [openModules, setOpenModules] = useState<string[]>([currentModuleId]);

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  return (
    <nav className="space-y-2">
      <div className="flex items-center gap-2 px-3 py-2 mb-2">
        <BookOpen size={14} className="text-brand-500" />
        <span className="text-xs font-semibold text-text-primary uppercase tracking-wider">
          Trilha
        </span>
      </div>

      {sidebar.map((module) => {
        const isOpen = openModules.includes(module.id);
        const isLocked = !module.unlocked;
        const completedCount = module.lessons.filter(
          (l) => l.status === 'completed'
        ).length;

        return (
          <div key={module.id}>
            <button
              onClick={() => !isLocked && toggleModule(module.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-left ${
                isLocked
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-surface-elevated'
              }`}
            >
              <span
                className={`shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold ${
                  isLocked
                    ? 'bg-surface-overlay text-text-muted'
                    : module.id === currentModuleId
                    ? 'bg-brand-500/20 text-brand-500'
                    : 'bg-surface-overlay text-text-secondary'
                }`}
              >
                {module.id}
              </span>

              <div className="flex-1 min-w-0">
                <p
                  className={`text-xs font-semibold truncate ${
                    isLocked ? 'text-text-muted' : 'text-text-primary'
                  }`}
                >
                  {module.title}
                </p>
                <p className="text-[10px] text-text-muted">
                  {completedCount}/{module.lessons.length} concluídas
                </p>
              </div>

              {!isLocked && (
                <span className="shrink-0 text-text-muted">
                  {isOpen ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </span>
              )}
              {isLocked && (
                <span className="shrink-0 text-text-muted">
                  <Lock size={12} />
                </span>
              )}
            </button>

            {isOpen && !isLocked && (
              <div className="mt-1 ml-3 pl-3 border-l border-border space-y-0.5">
                {module.lessons.map((lesson) => (
                  <LessonItem
                    key={lesson.id}
                    lesson={lesson}
                    currentLessonId={currentLessonId}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}