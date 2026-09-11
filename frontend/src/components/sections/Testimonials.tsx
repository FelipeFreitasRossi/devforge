import { Star, Quote } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const testimonials = [
  {
    name: 'Ana Ribeiro',
    role: 'Dev Frontend na Vercel',
    avatar: 'AR',
    text: 'A trilha da DevForge me tirou do zero absoluto e em 8 meses eu consegui minha primeira vaga como dev. Os projetos do portfólio fizeram toda a diferença.',
    rating: 5,
  },
  {
    name: 'Carlos Mendes',
    role: 'Fullstack Developer',
    avatar: 'CM',
    text: 'O que mais me impressionou foi a profundidade do conteúdo de backend. Não é curso raso — é formação de verdade, com projetos complexos e boas práticas.',
    rating: 5,
  },
  {
    name: 'Juliana Costa',
    role: 'Dev Python na Nubank',
    avatar: 'JC',
    text: 'Paguei uma vez e nunca mais me preocupei. Sempre que sai conteúdo novo, eu acesso. Vale cada centavo. Recomendo pra qualquer pessoa que queira levar programação a sério.',
    rating: 5,
  },
];

export function Testimonials() {
  const containerRef = useScrollAnimation<HTMLElement>({
    y: 40,
    stagger: 0.12,
  });

  return (
    <section
      ref={containerRef}
      className="px-4 sm:px-6 lg:px-8 py-fluid-section relative overflow-hidden"
    >
      {/* Glow de fundo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-25"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(59, 130, 246, 0.15), transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span
            data-animate
            className="text-xs md:text-sm font-semibold text-brand-500 uppercase tracking-wider"
          >
            Depoimentos
          </span>
          <h2
            data-animate
            className="text-fluid-4xl font-bold text-text-primary mt-3 md:mt-4 mb-5 md:mb-6 tracking-tight"
          >
            Alunos que transformaram a carreira
          </h2>
          <p data-animate className="text-fluid-base text-text-secondary leading-relaxed">
            Histórias reais de quem decidiu investir no próprio futuro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              data-animate
              className="relative flex flex-col p-6 md:p-7 rounded-xl border border-border bg-surface-elevated hover:border-brand-500/40 transition-all duration-300"
            >
              {/* Aspas decorativas */}
              <Quote
                size={32}
                className="text-brand-500/20 absolute top-5 right-5"
              />

              {/* Estrelas */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-brand-500 text-brand-500"
                  />
                ))}
              </div>

              {/* Texto */}
              <p className="text-text-secondary leading-relaxed text-sm md:text-base mb-6 flex-1">
                "{t.text}"
              </p>

              {/* Autor */}
              <div className="flex items-center gap-3 pt-5 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-brand-500/15 border border-brand-500/30 flex items-center justify-center">
                  <span className="text-sm font-bold text-brand-500">
                    {t.avatar}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-text-primary">
                    {t.name}
                  </div>
                  <div className="text-xs text-text-muted">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}