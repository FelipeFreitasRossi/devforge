import { ArrowRight, Sparkles, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export function Hero() {
  const navigate = useNavigate();
  const containerRef = useScrollAnimation<HTMLElement>({
    y: 60,
    duration: 1,
    stagger: 0.15,
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 pb-20 overflow-hidden"
    >
      {/* ... os glows e grid continuam iguais ... */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245, 158, 11, 0.20), transparent 65%)',
        }}
      />

      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] -z-10 opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse, rgba(59, 130, 246, 0.25), transparent 70%)',
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent 80%)',
        }}
      />

      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div data-animate className="inline-flex mb-8">
          <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/30 bg-brand-500/5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
            </span>
            <Sparkles size={14} className="text-brand-500" />
            <span className="text-xs md:text-sm text-brand-300 font-medium">
              Acesso vitalício · Pagamento único
            </span>
          </div>
        </div>

        {/* Título */}
        <h1
          data-animate
          className="text-fluid-5xl font-bold text-text-primary leading-[1.05] tracking-tight mb-6"
        >
          Domine programação.
          <br />
          <span className="relative inline-block">
            <span className="text-brand-500">Para sempre.</span>
            <svg
              className="absolute -bottom-2 md:-bottom-3 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M2 8C50 3 120 2 150 5C180 8 250 9 298 4"
                stroke="rgba(245, 158, 11, 0.5)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Subtítulo */}
        <p
          data-animate
          className="text-fluid-base md:text-fluid-lg text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Aprenda do zero ao profissional com projetos reais, mentoria da
          comunidade e acesso vitalício a todo o conteúdo.{' '}
          <span className="text-text-primary font-medium">
            Pague uma vez, evolua para sempre.
          </span>
        </p>

        {/* CTAs — AGORA FUNCIONAIS */}
        <div
          data-animate
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-12"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto group"
            onClick={() => navigate('/cadastro')}
          >
            Começar agora
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => {
              const el = document.getElementById('curriculum');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Play size={18} className="fill-current" />
            Ver o currículo
          </Button>
        </div>

        {/* Microcopy */}
        <div
          data-animate
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs md:text-sm text-text-muted"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            Garantia de 7 dias
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            Sem assinatura
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            Acesso imediato
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-text-muted animate-bounce"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-text-muted to-transparent" />
      </div>
    </section>
  );
}