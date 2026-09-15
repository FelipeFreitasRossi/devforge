import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { StudentHeader } from '../components/student/StudentHeader';
import { WelcomeSection } from '../components/student/WelcomeSection';
import { StatsGrid } from '../components/student/StatsGrid';
import { ContinueLearning } from '../components/student/ContinueLearning';
import { WeeklyActivity } from '../components/student/WeeklyActivity';
import { WeeklyGoal } from '../components/student/WeeklyGoal';
import { UpNext } from '../components/student/UpNext';
import { ModulesGrid } from '../components/student/ModulesGrid';
import { Achievements } from '../components/student/Achievements';
import { StudentFooter } from '../components/student/StudentFooter';
import { PageBackground } from '../components/ui/PageBackground';
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
    loading,
    error,
  } = useDashboard();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 size={32} className="text-brand-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-4">
        <div className="text-center max-w-md">
          <p className="text-danger text-sm font-medium mb-2">
            Erro ao carregar dados
          </p>
          <p className="text-text-muted text-xs">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <PageBackground />
      <StudentHeader />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-8 md:space-y-12">
        <WelcomeSection overview={overview} />

        <StatsGrid overview={overview} />

        <ContinueLearning overview={overview} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
          <div className="lg:col-span-2">
            <WeeklyActivity activity={weeklyActivity} />
          </div>
          <div className="lg:col-span-1">
            <WeeklyGoal overview={overview} />
          </div>
        </div>

        <UpNext modules={modules} />

        <ModulesGrid modules={modules} />

        <Achievements achievements={achievements} />
      </main>

      <StudentFooter />
    </div>
  );
}