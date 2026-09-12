import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useScrolled } from '../../hooks/useScrolled';

const LOGO_URL = 'https://i.postimg.cc/X7RLxfVm/3.png';

const navLinks = [
  { href: '#features', label: 'Vantagens' },
  { href: '#curriculum', label: 'Currículo' },
  { href: '#pricing', label: 'Investimento' },
  { href: '#faq', label: 'FAQ' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = useScrolled(20);
  const navigate = useNavigate();

  const goToLogin = () => {
    setIsOpen(false);
    navigate('/login');
  };

  const goToCadastro = () => {
    setIsOpen(false);
    navigate('/cadastro');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-lg border-border'
          : 'bg-black md:bg-transparent md:border-transparent border-border'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-16' : 'h-20 md:h-24'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 md:gap-3 group">
            <img
              src={LOGO_URL}
              alt="Devstack"
              className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                scrolled ? 'h-8 md:h-9' : 'h-9 md:h-11'
              }`}
            />
            <span
              className={`font-bold text-text-primary tracking-tight transition-all duration-300 ${
                scrolled ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
              }`}
            >
              Dev
              <span className="text-brand-500 group-hover:text-brand-400 transition-colors">
                stack
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 right-0 h-px bg-brand-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={goToLogin}>
              Entrar
            </Button>
            <Button size="sm" onClick={goToCadastro}>
              Começar agora
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 pb-4' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-1 pt-4 border-t border-border">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-text-primary transition-colors py-3 text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 mt-4">
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={goToLogin}
              >
                Entrar
              </Button>
              <Button size="sm" className="w-full" onClick={goToCadastro}>
                Começar agora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}