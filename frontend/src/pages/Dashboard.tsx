import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Trophy, Clock, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';

const LOGO_URL = 'https://i.postimg.cc/X7RLxfVm/3.png';

export function Dashboard() {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-text-secondary">Carregando...</div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="border-b border-border bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src={LOGO_URL} alt="Devstack" className="h-8 w-auto" />
            <span className="text-lg font-bold text-text-primary">
              Dev<span className="text-brand-500">stack</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-text-secondary hidden sm:block">
              Olá, {user.name}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut size={16} />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
            Bem-vindo, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-text-secondary">
            Aqui está o resumo da sua jornada como dev.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="p-6 rounded-xl border border-border bg-surface-elevated">
            <BookOpen size={24} className="text-brand-500 mb-4" />
            <div className="text-2xl font-bold text-text-primary mb-1">0</div>
            <div className="text-sm text-text-secondary">
              Cursos em andamento
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-surface-elevated">
            <Trophy size={24} className="text-brand-500 mb-4" />
            <div className="text-2xl font-bold text-text-primary mb-1">0</div>
            <div className="text-sm text-text-secondary">Módulos concluídos</div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-surface-elevated">
            <Clock size={24} className="text-brand-500 mb-4" />
            <div className="text-2xl font-bold text-text-primary mb-1">0h</div>
            <div className="text-sm text-text-secondary">Tempo de estudo</div>
          </div>
        </div>

        {/* Área do curso */}
        <div className="p-8 rounded-xl border border-border bg-surface-elevated">
          <h2 className="text-xl font-bold text-text-primary mb-4">
            Seu curso
          </h2>
          <p className="text-text-secondary mb-6">
            {user.paid
              ? 'Você tem acesso completo. Bons estudos!'
              : 'Complete o pagamento para liberar o conteúdo.'}
          </p>
          {!user.paid && (
            <Button onClick={() => navigate('/checkout')}>
              Finalizar pagamento
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}