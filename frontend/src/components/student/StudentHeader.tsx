import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  LogOut,
  Menu,
  X,
  User as UserIcon,
  LayoutDashboard,
  Home,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { SearchBar } from './SearchBar';

const LOGO_URL = 'https://i.postimg.cc/X7RLxfVm/3.png';

export function StudentHeader() {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const user = authUser || {
    id: 'dev',
    name: 'Dev Teste',
    email: 'dev@teste.com',
    paid: true,
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const openMenu = () => {
    setIsClosing(false);
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 280);
  };

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
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          scrolled
            ? 'bg-black/95 backdrop-blur-xl border-border shadow-lg shadow-black/30'
            : 'bg-black border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16 gap-2 md:gap-3">
            {/* Logo — texto escondido no mobile para ganhar espaço */}
            <Link
              to="/minha-area"
              className="flex items-center gap-2 group shrink-0"
            >
              <img
                src={LOGO_URL}
                alt="Devstack"
                className="h-7 md:h-8 w-auto object-contain transition-transform group-hover:scale-105 shrink-0"
              />
              <span className="hidden md:block text-base md:text-lg font-bold text-text-primary tracking-tight whitespace-nowrap">
                Dev<span className="text-brand-500">stack</span>
              </span>
            </Link>

            {/* Busca — SEMPRE visível (mobile + desktop) */}
            <div className="flex-1 min-w-0 max-w-md mx-auto md:mx-4">
              <SearchBar />
            </div>

            {/* Ações */}
            <div className="flex items-center gap-1 md:gap-2 shrink-0">
              {/* Notificação — só desktop */}
              <button
                className="hidden md:flex relative p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
                aria-label="Notificações"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-brand-500" />
              </button>

              {/* Avatar — só desktop */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 md:pr-2.5 rounded-lg hover:bg-surface-elevated transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500/30 to-brand-600/10 border border-brand-500/40 flex items-center justify-center">
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
                    <div className="absolute right-0 top-full mt-2 w-60 rounded-xl border border-border bg-surface-elevated shadow-2xl overflow-hidden z-50 animate-fade-in">
                      <div className="p-4 border-b border-border bg-gradient-to-br from-brand-500/5 to-transparent">
                        <p className="text-sm font-semibold text-text-primary truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-text-muted truncate mt-0.5">
                          {user.email}
                        </p>
                      </div>
                      <div className="p-1.5">
                        <Link
                          to="/perfil"
                          onClick={() => setIsProfileOpen(false)}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-overlay transition-colors"
                        >
                          <UserIcon size={16} />
                          Meu perfil
                        </Link>
                        <Link
                          to="/minha-area"
                          onClick={() => setIsProfileOpen(false)}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-overlay transition-colors"
                        >
                          <LayoutDashboard size={16} />
                          Minha área
                        </Link>
                        <div className="my-1.5 h-px bg-border" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors"
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
                className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors shrink-0"
                onClick={openMenu}
                aria-label="Abrir menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ===== MENU MOBILE (DRAWER) ===== */}
      {isMenuOpen && (
        <>
          <div
            className={`md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 ${
              isClosing ? 'animate-fade-out' : 'animate-fade-in'
            }`}
            onClick={closeMenu}
          />

          <div
            className={`md:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-xs bg-surface border-l border-border z-50 flex flex-col ${
              isClosing ? 'animate-slide-out-right' : 'animate-slide-in-right'
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="text-sm font-bold text-text-primary">Menu</span>
              <button
                onClick={closeMenu}
                className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors"
                aria-label="Fechar menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Usuário */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500/30 to-brand-600/10 border border-brand-500/40 flex items-center justify-center shrink-0">
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
            </div>

            {/* Links */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              <Link
                to="/minha-area"
                onClick={closeMenu}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
              >
                <Home size={18} />
                Início
              </Link>
              <Link
                to="/perfil"
                onClick={closeMenu}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
              >
                <UserIcon size={18} />
                Meu perfil
              </Link>
              <button
                onClick={closeMenu}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
              >
                <Bell size={18} />
                Notificações
              </button>
            </nav>

            {/* Sair */}
            <div className="p-4 border-t border-border">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-danger/10 border border-danger/20 text-sm font-medium text-danger hover:bg-danger/15 transition-colors"
              >
                <LogOut size={16} />
                Sair da conta
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}