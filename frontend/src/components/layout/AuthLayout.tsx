import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const LOGO_URL = 'https://i.postimg.cc/X7RLxfVm/3.png';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-surface relative overflow-hidden">
      {/* Glow de fundo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245, 158, 11, 0.15), transparent 60%)',
        }}
      />

      {/* Header */}
      <header className="p-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 group"
        >
          <img
            src={LOGO_URL}
            alt="Devstack"
            className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="text-xl font-bold text-text-primary">
            Dev<span className="text-brand-500">stack</span>
          </span>
        </Link>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 flex items-center justify-center px-4 pb-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-text-secondary text-sm">{subtitle}</p>
            )}
          </div>

          <div className="bg-surface-elevated border border-border rounded-2xl p-6 md:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}