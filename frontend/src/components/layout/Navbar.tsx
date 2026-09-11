import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

const LOGO_URL = 'https://i.postimg.cc/0N6ThCRg/Logo-tecnologica-Dev-Forge.png';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/cursos', label: 'Cursos' },
    { href: '/sobre', label: 'Sobre' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo + nome */}
          <Link to="/" className="flex items-center gap-2.5 md:gap-3 group">
            <img
              src={LOGO_URL}
              alt="DevForge"
              className="h-8 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-lg md:text-2xl font-bold text-text-primary tracking-tight">
              Dev
              <span className="text-brand-500 group-hover:text-brand-400 transition-colors">
                Forge
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Button size="sm">Entrar</Button>
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
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-text-secondary hover:text-text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button size="sm" className="w-full mt-2">
                Entrar
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}