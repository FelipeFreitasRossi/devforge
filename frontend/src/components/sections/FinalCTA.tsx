import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export function FinalCTA() {
  const containerRef = useScrollAnimation<HTMLElement>({ y: 40, stagger: 0.12 });

  return (
    <section
      ref={containerRef}
      className="px-4 sm:px-6 lg:px-8 py-fluid-section"
    >
      <div className="max-w-4xl mx-auto text-center relative">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.15), transparent 70%)',
          }}
        />

        <h2
          data-animate
          className="text-fluid-4xl font-bold text-text-primary leading-tight tracking-tight mb-5 md:mb-6"
        >
          Sua jornada como dev começa{' '}
          <span className="text-brand-500">agora</span>.
        </h2>

        <p
          data-animate
          className="text-fluid-base md:text-fluid-lg text-text-secondary max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed"
        >
          Junte-se a milhares de alunos que transformaram a carreira com a
          DevForge. Pague uma vez, aprenda para sempre.
        </p>

        <div
          data-animate
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
        >
          <Button size="lg" className="w-full sm:w-auto">
            Quero garantir meu acesso
            <ArrowRight size={20} />
          </Button>
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">
            Falar com suporte
          </Button>
        </div>
      </div>
    </section>
  );
}