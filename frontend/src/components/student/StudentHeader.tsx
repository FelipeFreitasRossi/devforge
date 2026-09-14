import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  LogOut,
  Menu,
  X,
  User as UserIcon,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const LOGO_URL = 'https://i.postimg.cc/X7RLxfVm/3.png';

export function StudentHeader() {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ⚠️ DEV ONLY: fallback para usuário fake
  const user = authUser || {
    id: 'dev',
    name: 'Dev Teste',
    email: 'dev@teste.com',
    paid: true,
  };

  // Detecta scroll para efeito glass
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-xl border-border shadow-lg shadow-black/20'
          : 'bg-black/80 backdrop-blur-md border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <img
              src={LOGO_URL}
              alt="Devstack"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-lg font-bold text-text-primary tracking-tight hidden sm:block">
              Dev<span className="text-brand-500">stack</span>
            </span>
          </Link>

          {/* Busca desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
              />
              <input
                type="text"
                placeholder="Buscar aulas, módulos..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface-elevated border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-all"
              />
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center gap-2">
            {/* Notificações */}
            <button
              className="relative p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
              aria-label="Notificações"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500">
                <span className="absolute inset-0 rounded-full bg-brand-500 animate-ping opacity-75" />
              </span>
            </button>

            {/* Avatar desktop */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-lg hover:bg-surface-elevated transition-colors"
                aria-label="Menu do usuário"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500/30 to-brand-600/20 border border-brand-500/40 flex items-center justify-center">
                  <span className="text-xs font-bold text-brand-400">
                    {initials}
                  </span>
                </div>
                <span className="text-sm text-text-secondary hidden lg:block max-w-[100px] truncate">
                  {user.name.split(' ')[0]}
                </span>
              </button>

              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-surface-elevated shadow-2xl overflow-hidden z-50 animate-fade-in">
                    <div className="p-4 border-b border-border bg-gradient-to-br from-brand-500/5 to-transparent">
                      <p className="text-sm font-semibold text-text-primary truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-text-muted truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="p-1">
                      <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-surface-overlay transition-colors">
                        <UserIcon size={16} />
                        Meu perfil
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors"
                      >
                        <LogOut size={16} />
                        Sair
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Menu mobile */}
            <button
              className="sm:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Menu mobile expandido */}
        <div
          className={`sm:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          }`}
        >
          <div className="border-t border-border">
            <div className="pt-4 flex items-center gap-3 pb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500/30 to-brand-600/20 border border-brand-500/40 flex items-center justify-center">
                <span className="text-sm font-bold text-brand-400">
                  {initials}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text-primary truncate">
                  {user.name}
                </p>
                <p className="text-xs text-text-muted truncate">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors text-left">
                <UserIcon size={16} />
                Meu perfil
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors text-left"
              >
                <LogOut size={16} />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}