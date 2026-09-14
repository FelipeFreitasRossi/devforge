import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentHeader } from '../components/student/StudentHeader';
import { HeroSection } from '../components/student/HeroSection';
import { StatsGrid } from '../components/student/StatsGrid';
import { ContinueLearning } from '../components/student/ContinueLearning';
import { WeeklyActivity } from '../components/student/WeeklyActivity';
import { WeeklyGoal } from '../components/student/WeeklyGoal';
import { ActivityChart } from '../components/student/ActivityChart';
import { UpNext } from '../components/student/UpNext';
import { ModulesGrid } from '../components/student/ModulesGrid';
import { Achievements } from '../components/student/Achievements';
import { NextAchievement } from '../components/student/NextAchievement';
import { ActivityTimeline } from '../components/student/ActivityTimeline';
import { StudentAreaSkeleton } from '../components/ui/Skeleton';
import { useAuth } from '../contexts/AuthContext';
import { useDashboard } from '../hooks/useDashboard';

export function StudentArea() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const {
    overview,
    modules,
    achievements,
    weeklyActivity,
    timeDistribution,
    timeline,
    loading,
    error,
  } = useDashboard();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // A conquista mais perto de ser desbloqueada = maior progress_percent
  // entre as que ainda não foram conquistadas.
  const proximaConquista =
    achievements
      .filter((a) => !a.unlocked)
      .sort((a, b) => (b.progress_percent ?? 0) - (a.progress_percent ?? 0))[0] ??
    null;

  return (
    <div className="min-h-screen bg-surface">
      <StudentHeader />

      {authLoading || loading ? (
        <StudentAreaSkeleton />
      ) : error ? (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="max-w-md text-center">
            <p className="mb-2 text-sm font-medium text-danger">
              Erro ao carregar dados
            </p>
            <p className="text-xs text-text-muted">{error}</p>
          </div>
        </div>
      ) : overview ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10 md:space-y-14">
          <HeroSection overview={overview} />
          <StatsGrid overview={overview} />
          <ContinueLearning overview={overview} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              <WeeklyActivity activity={weeklyActivity} />
            </div>
            <div className="lg:col-span-1">
              <WeeklyGoal overview={overview} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              <ActivityChart distribution={timeDistribution} />
            </div>
            <div className="lg:col-span-1">
              <NextAchievement achievement={proximaConquista} />
            </div>
          </div>

          <UpNext modules={modules} />
          <ModulesGrid modules={modules} />
          <Achievements achievements={achievements} />
          <ActivityTimeline entries={timeline} />
        </main>
      ) : null}

      <footer className="border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Devstack. Todos os direitos
            reservados.
          </p>
          <p className="text-xs text-text-muted">
            Bons estudos. Continue firme.
          </p>
        </div>
      </footer>
    </div>
  );
}
