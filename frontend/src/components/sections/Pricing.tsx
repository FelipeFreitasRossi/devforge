import { Check, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const benefits = [
  'Acesso vitalício a todos os módulos',
  'Novos conteúdos sem custo adicional',
  'Comunidade exclusiva de alunos',
  'Projetos práticos com código-fonte',
  'Exercícios com soluções comentadas',
  'Suporte direto com instrutores',
  'Atualizações para sempre',
  'Garantia de 7 dias',
];

export function Pricing() {
  const containerRef = useScrollAnimation<HTMLElement>({
    y: 40,
    stagger: 0.1,
  });

  return (
    <section
      id="pricing"
      ref={containerRef}
      className="px-4 sm:px-6 lg:px-8 py-fluid-section"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span
            data-animate
            className="text-xs md:text-sm font-semibold text-brand-500 uppercase tracking-wider"
          >
            Investimento
          </span>
          <h2
            data-animate
            className="text-fluid-4xl font-bold text-text-primary mt-3 md:mt-4 mb-5 md:mb-6 tracking-tight"
          >
            Pague uma vez. Acesse para sempre.
          </h2>
          <p data-animate className="text-fluid-base text-text-secondary leading-relaxed">
            Sem assinatura, sem mensalidade, sem surpresas. Um único pagamento
            e o conhecimento é seu para sempre.
          </p>
        </div>

        <div
          data-animate
          className="relative rounded-2xl border-2 border-brand-500/50 bg-surface-elevated p-6 sm:p-8 md:p-12 shadow-glow overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-30"
            style={{
              background:
                'radial-gradient(circle at top right, rgba(245, 158, 11, 0.3), transparent 60%)',
            }}
          />

          <div className="absolute top-4 right-4 md:top-6 md:right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500 text-surface text-xs font-bold">
            <Sparkles size={12} />
            ACESSO VITALÍCIO
          </div>

          <div className="text-center mb-8 md:mb-10">
            <h3 className="text-fluid-2xl font-bold text-text-primary mb-2">
              Acesso Completo
            </h3>
            <p className="text-text-secondary mb-6 md:mb-8 text-sm md:text-base">
              Pagamento único, sem renovação
            </p>

            <div className="flex items-end justify-center gap-2 mb-2">
              <span className="text-sm md:text-base text-text-secondary mb-3 md:mb-4">
                R$
              </span>
              <span className="text-fluid-5xl font-bold text-brand-500 leading-none">
                19,99
              </span>
            </div>
            <p className="text-xs md:text-sm text-text-muted">
              pagamento único · sem mensalidade
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <Check
                  size={20}
                  className="text-brand-500 shrink-0 mt-0.5"
                />
                <span className="text-text-secondary text-sm leading-relaxed">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>

          <Button size="lg" className="w-full">
            Garantir meu acesso por R$19,99
          </Button>

          <p className="text-center text-xs text-text-muted mt-4 md:mt-5">
            Compra segura · Acesso imediato após o pagamento
          </p>
        </div>
      </div>
    </section>
  );
}