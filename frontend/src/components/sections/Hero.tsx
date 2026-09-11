import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export function Hero() {
  const containerRef = useScrollAnimation<HTMLElement>({
    y: 60,
    duration: 1,
    stagger: 0.15,
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-16 md:pb-24 overflow-hidden"
    >
      {/* Glow radial */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245, 158, 11, 0.18), transparent 70%)',
        }}
      />

      {/* Grid sutil */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div
          data-animate
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/5 mb-6 md:mb-8"
        >
          <Sparkles size={14} className="text-brand-500" />
          <span className="text-xs md:text-sm text-brand-300 font-medium">
            Acesso vitalício · Pagamento único
          </span>
        </div>

        {/* Título */}
        <h1
          data-animate
          className="text-fluid-5xl font-bold text-text-primary leading-[1.05] tracking-tight mb-5 md:mb-6"
        >
          Domine programação.
          <br />
          <span className="text-brand-500">Para sempre.</span>
        </h1>

        {/* Subtítulo */}
        <p
          data-animate
          className="text-fluid-base md:text-fluid-lg text-text-secondary max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed"
        >
          Aprenda do zero ao profissional com projetos reais, mentoria da
          comunidade e acesso vitalício a todo o conteúdo. Pague uma vez,
          evolua para sempre.
        </p>

        {/* CTAs */}
        <div
          data-animate
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center"
        >
          <Button size="lg" className="w-full sm:w-auto">
            Começar agora
            <ArrowRight size={20} />
          </Button>
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">
            Ver o currículo
          </Button>
        </div>

        {/* Microcopy */}
        <p data-animate className="text-xs md:text-sm text-text-muted mt-6 md:mt-8">
          Garantia de 7 dias · Sem assinatura · Acesso imediato
        </p>
      </div>
    </section>
  );
}