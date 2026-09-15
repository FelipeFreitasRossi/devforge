import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Target,
  Menu,
  X,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { StudentHeader } from '../components/student/StudentHeader';
import { LessonSidebar } from '../components/lesson/LessonSidebar';
import { LessonContent } from '../components/lesson/LessonContent';
import { ExerciseBlock } from '../components/lesson/ExerciseBlock';
import { useLesson } from '../hooks/useLesson';
import { useAuth } from '../contexts/AuthContext';
import { getDisplayNumberPadded } from '../utils/lessonNumbers';

export function LessonPage() {
  const { lessonId } = useParams<{ moduleId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarClosing, setSidebarClosing] = useState(false);

  const {
    data,
    loading,
    error,
    codes,
    updateCode,
    submit,
    submitting,
    results,
  } = useLesson(lessonId);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    // Fecha ao mudar de lição (sem animação, mudança instantânea)
    setSidebarOpen(false);
    setSidebarClosing(false);
  }, [lessonId]);

  // Bloqueia scroll quando sidebar aberta no mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const openSidebar = () => {
    setSidebarClosing(false);
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarClosing(true);
    setTimeout(() => {
      setSidebarOpen(false);
      setSidebarClosing(false);
    }, 280);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 size={32} className="text-brand-500 animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-4">
        <div className="text-center max-w-md">
          <AlertCircle size={32} className="text-danger mx-auto mb-4" />
          <p className="text-danger text-sm font-medium mb-2">
            Erro ao carregar lição
          </p>
          <p className="text-text-muted text-xs mb-4">
            {error ?? 'Lição não disponível'}
          </p>
          <Link
            to="/minha-area"
            className="inline-block text-brand-500 hover:text-brand-400 text-sm font-medium"
          >
            ← Voltar para a área do aluno
          </Link>
        </div>
      </div>
    );
  }

  const {
    lesson,
    already_completed,
    attempts,
    prev_lesson_id,
    next_lesson_id,
    sidebar,
  } = data;

  const topics = lesson.topics ?? [];

  return (
    <div className="min-h-screen bg-surface">
      <StudentHeader />

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar DESKTOP */}
        <aside className="hidden lg:block w-72 shrink-0 border-r border-border min-h-[calc(100vh-4rem)] p-4 sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <LessonSidebar sidebar={sidebar} currentLessonId={lesson.id} />
        </aside>

        {/* Sidebar MOBILE (drawer com animação de entrada E saída) */}
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <div
              className={`lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 ${
                sidebarClosing ? 'animate-fade-out' : 'animate-fade-in'
              }`}
              onClick={closeSidebar}
            />

            {/* Drawer */}
            <aside
              className={`lg:hidden fixed top-0 left-0 bottom-0 w-[85%] max-w-xs bg-surface border-r border-border z-50 flex flex-col ${
                sidebarClosing
                  ? 'animate-slide-out-left'
                  : 'animate-slide-in-left'
              }`}
            >
              {/* Topo */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  Trilha
                </span>
                <button
                  onClick={closeSidebar}
                  className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors"
                  aria-label="Fechar trilha"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Conteúdo da sidebar com scroll */}
              <div className="flex-1 overflow-y-auto p-4">
                <LessonSidebar
                  sidebar={sidebar}
                  currentLessonId={lesson.id}
                />
              </div>
            </aside>
          </>
        )}

        <main className="flex-1 min-w-0">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
            <button
              onClick={openSidebar}
              className="lg:hidden inline-flex items-center gap-2 mb-6 px-3.5 py-2.5 rounded-lg border border-border bg-surface-elevated text-sm text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
            >
              <Menu size={16} />
              Ver trilha
            </button>

            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted bg-surface-elevated px-3 py-1 rounded-full border border-border">
                  {lesson.module_id}-{getDisplayNumberPadded(lesson.id)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
                  <Clock size={12} />
                  {lesson.reading_time_minutes} min de leitura
                </span>
                {already_completed && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-accent-500 font-medium">
                    <CheckCircle2 size={12} />
                    Concluída
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-4xl font-bold text-text-primary tracking-tight mb-4">
                {lesson.title}
              </h1>

              <div className="p-4 md:p-5 rounded-xl border border-border bg-surface-elevated">
                <div className="flex items-center gap-2 mb-3">
                  <Target size={14} className="text-brand-500" />
                  <span className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                    O que você vai aprender
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {lesson.objectives.map((obj, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-brand-500 mt-2" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {topics.map((topic, topicIndex) => (
              <div key={topic.id} className="mb-14">
                <div className="flex items-center gap-3 mb-6">
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-brand-500/15 border border-brand-500/40 flex items-center justify-center text-sm font-bold text-brand-500 font-mono">
                    {topicIndex + 1}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight">
                    {topic.title}
                  </h2>
                </div>

                <article className="mb-8">
                  <LessonContent blocks={topic.content} />
                </article>

                {topic.exercise && (
                  <ExerciseBlock
                    exerciseNumber={topicIndex + 1}
                    title={topic.exercise.title}
                    statement={topic.exercise.statement}
                    hint={topic.exercise.hint}
                    code={codes[topic.exercise.id] ?? topic.exercise.starter_code}
                    onCodeChange={(code) => updateCode(topic.exercise!.id, code)}
                    onSubmit={() => submit(topic.exercise!.id)}
                    submitting={submitting === topic.exercise.id}
                    result={results[topic.exercise.id] ?? null}
                    attempts={attempts}
                  />
                )}
              </div>
            ))}

            <section className="mb-10 p-5 md:p-6 rounded-xl border border-border bg-surface-elevated">
              <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-3">
                Resumo
              </h3>
              <ul className="space-y-2">
                {lesson.summary.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <CheckCircle2
                      size={14}
                      className="text-accent-500 shrink-0 mt-0.5"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <nav className="flex items-center justify-between gap-4 pt-6 border-t border-border">
              {prev_lesson_id ? (
                <Link
                  to={`/minha-area/curso/${prev_lesson_id.split('-')[0]}/licao/${prev_lesson_id}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-surface-elevated text-sm text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
                >
                  <ChevronLeft size={16} />
                  Anterior
                </Link>
              ) : (
                <span />
              )}

              {next_lesson_id ? (
                <Link
                  to={`/minha-area/curso/${next_lesson_id.split('-')[0]}/licao/${next_lesson_id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface-elevated border border-border text-sm text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
                >
                  Próxima lição
                  <ChevronRight size={16} />
                </Link>
              ) : (
                <Link
                  to="/minha-area"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-500 text-surface text-sm font-medium hover:bg-brand-400 shadow-glow"
                >
                  Voltar para a área
                  <ChevronRight size={16} />
                </Link>
              )}
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
}