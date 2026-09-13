import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { StudentHeader } from '../components/student/StudentHeader';
import { WelcomeSection } from '../components/student/WelcomeSection';
import { StatsGrid } from '../components/student/StatsGrid';
import { ContinueLearning } from '../components/student/ContinueLearning';
import { ModulesGrid } from '../components/student/ModulesGrid';
import { Achievements } from '../components/student/Achievements';
import { useAuth } from '../contexts/AuthContext';
import { useDashboard } from '../hooks/useDashboard';

// ⚠️ DEV ONLY: mude para false antes de ir para produção
const DEV_MODE = true;

export function StudentArea() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { overview, modules, achievements, loading, error } = useDashboard();

  useEffect(() => {
    if (DEV_MODE) return;
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
          <p className="text-text-muted text-xs mt-4">
            Verifique se o backend está rodando e se você está logado.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <StudentHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10 md:space-y-14">
        <WelcomeSection overview={overview} />
        <StatsGrid overview={overview} />
        <ContinueLearning overview={overview} />
        <ModulesGrid modules={modules} />
        <Achievements achievements={achievements} />
      </main>

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