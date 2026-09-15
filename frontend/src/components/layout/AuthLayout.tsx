import { useRef } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SlothMascot } from '../auth/SlothMascot';

const LOGO_URL = 'https://i.postimg.cc/X7RLxfVm/3.png';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  /** Define o canto do mascote. Padrão: 'right' */
  mascotSide?: 'left' | 'right';
}

export function AuthLayout({
  children,
  title,
  subtitle,
  mascotSide = 'right',
}: AuthLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const isLeft = mascotSide === 'left';

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 1. Glow âmbar cresce vindo da direita
      tl.fromTo(
        glowRef.current,
        { opacity: 0, x: 80 },
        { opacity: 1, x: 0, duration: 1.4, ease: 'power3.out' }
      );

      // 2. Mascote entra deslizando pela lateral (do canto onde ele está)
      tl.fromTo(
        mascotRef.current,
        { opacity: 0, x: isLeft ? -80 : 80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '-=1.2'
      );

      // 3. Card entra de baixo
      tl.fromTo(
        cardRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col bg-[#050506] relative overflow-hidden"
    >
      {/* ===== GLOW ÂMBAR FORTE — canto direito ===== */}
      <div
        ref={glowRef}
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{
          background: `
            radial-gradient(
              ellipse 90% 120% at 100% 50%,
              rgba(245, 158, 11, 0.22) 0%,
              rgba(245, 158, 11, 0.10) 20%,
              rgba(245, 158, 11, 0.04) 40%,
              rgba(245, 158, 11, 0.01) 60%,
              transparent 80%
            )
          `,
        }}
      />

      {/* ===== GLOW AZUL SUTIL — canto inferior esquerdo ===== */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse 60% 80% at 0% 100%,
              rgba(88, 101, 242, 0.10) 0%,
              rgba(88, 101, 242, 0.03) 30%,
              transparent 60%
            )
          `,
        }}
      />

      {/* ===== GRID SUTIL ===== */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent 100%)',
        }}
      />

      {/* ===== NOISE/GRAIN ===== */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      {/* ===== 🦥 MASCOTE COLADO NO CANTO INFERIOR, SAINDO PELA BORDA ===== */}
      <div
        className={`absolute bottom-0 z-20 pointer-events-none translate-y-[-45px] ${
          isLeft ? 'left-0 -translate-x-[30px]' : 'right-0 translate-x-[30px]'
        }`}
      >
        {/* Wrapper que recebe a animação GSAP (opacity + x) */}
        <div ref={mascotRef} className="opacity-0">
          {/* Wrapper que aplica o flip horizontal no modo 'left' */}
          <div
            style={{
              transform: isLeft ? 'scaleX(-1)' : 'none',
            }}
          >
            <div className="hidden sm:block">
              <SlothMascot size={200} anchor="bottom" />
            </div>
            <div className="sm:hidden">
              <SlothMascot size={130} anchor="bottom" />
            </div>
          </div>
        </div>
      </div>

      {/* ===== HEADER ===== */}
      <header className="relative z-10 p-5 sm:p-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 group"
        >
          <img
            src={LOGO_URL}
            alt="Devstack"
            className="h-8 md:h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="text-lg md:text-xl font-bold text-text-primary tracking-tight">
            Dev<span className="text-brand-500">stack</span>
          </span>
        </Link>
      </header>

      {/* ===== CONTEÚDO ===== */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 pb-12">
        <div className="w-full max-w-md">
          <div ref={cardRef} className="opacity-0">
            {/* Título */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2 tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-text-secondary text-sm">{subtitle}</p>
              )}
            </div>

            {/* Card com glow interno */}
            <div className="relative bg-[#0c0c0e] border border-border rounded-2xl p-5 sm:p-6 md:p-8 overflow-hidden shadow-2xl shadow-black/40">
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 120% 100% at 100% 0%, rgba(245, 158, 11, 0.10) 0%, rgba(245, 158, 11, 0.03) 30%, transparent 65%)',
                }}
              />

              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent pointer-events-none"
              />

              <div className="relative">{children}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}