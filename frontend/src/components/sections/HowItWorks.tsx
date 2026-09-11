import { CreditCard, Unlock, Rocket } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const steps = [
  {
    icon: CreditCard,
    number: '01',
    title: 'Faça o pagamento único',
    description:
      'Escolha o plano vitalício e finalize em menos de 2 minutos. Sem assinatura, sem renovação.',
  },
  {
    icon: Unlock,
    number: '02',
    title: 'Receba acesso imediato',
    description:
      'Assim que o pagamento é confirmado, você recebe o login e todo o conteúdo liberado na hora.',
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Aprenda no seu ritmo',
    description:
      'Estude quando e quanto quiser. O acesso é vitalício — você nunca perde o que conquistou.',
  },
];

export function HowItWorks() {
  const containerRef = useScrollAnimation<HTMLElement>({
    y: 40,
    stagger: 0.12,
  });

  return (
    <section
      ref={containerRef}
      className="px-4 sm:px-6 lg:px-8 py-fluid-section relative overflow-hidden"
    >
      {/* Glow sutil de fundo para preencher o vazio */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(245, 158, 11, 0.12), transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span
            data-animate
            className="text-xs md:text-sm font-semibold text-brand-500 uppercase tracking-wider"
          >
            Como funciona
          </span>
          <h2
            data-animate
            className="text-fluid-4xl font-bold text-text-primary mt-3 md:mt-4 mb-5 md:mb-6 tracking-tight"
          >
            Do pagamento ao primeiro projeto em minutos
          </h2>
          <p data-animate className="text-fluid-base text-text-secondary leading-relaxed">
            Um processo simples, direto e sem burocracia. Você paga, acessa e
            começa a estudar no mesmo dia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* Linha conectora no desktop */}
          <div
            aria-hidden
            className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent"
          />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                data-animate
                className="relative flex flex-col items-center text-center p-6 md:p-8 rounded-xl border border-border bg-surface-elevated/60 backdrop-blur-sm hover:border-brand-500/40 transition-colors"
              >
                {/* Ícone */}
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center mb-5 md:mb-6 relative z-10 bg-surface-elevated">
                  <Icon size={24} className="text-brand-500" />
                </div>

                {/* Número */}
                <span className="text-xs font-mono font-bold text-brand-500/60 mb-2">
                  PASSO {step.number}
                </span>

                <h3 className="text-fluid-xl font-semibold text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary leading-relaxed text-sm md:text-base">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}