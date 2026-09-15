import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { StudentHeader } from '../components/student/StudentHeader';
import { StudentFooter } from '../components/student/StudentFooter';
import { PageBackground } from '../components/ui/PageBackground';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileStats } from '../components/profile/ProfileStats';
import { ProfileInfo } from '../components/profile/ProfileInfo';
import { ProfilePassword } from '../components/profile/ProfilePassword';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../contexts/AuthContext';

export function Profile() {
  const navigate = useNavigate();
  const { user, loading: authLoading, updateUser } = useAuth();
  const { data, loading, error, updateName, changePassword } = useProfile();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const handleSaveName = async (name: string) => {
    await updateName(name);
    if (user) {
      updateUser({ ...user, name });
    }
  };

  const handleChangePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    await changePassword(currentPassword, newPassword);
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
            Erro ao carregar perfil
          </p>
          <p className="text-text-muted text-xs mb-4">
            {error ?? 'Perfil não disponível'}
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

  return (
    <div className="min-h-screen relative">
      <PageBackground />

      <StudentHeader />

      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8 md:space-y-10">
        <Link
          to="/minha-area"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors"
        >
          <ArrowLeft size={16} />
          Voltar para a área do aluno
        </Link>

        <ProfileHeader
          name={data.user.name}
          email={data.user.email}
          createdAt={data.user.created_at}
          paid={data.user.paid}
        />

        <ProfileStats stats={data.stats} />

        <ProfileInfo
          name={data.user.name}
          email={data.user.email}
          onSaveName={handleSaveName}
        />

        <ProfilePassword onChangePassword={handleChangePassword} />
      </main>

      <StudentFooter />
    </div>
  );
}   