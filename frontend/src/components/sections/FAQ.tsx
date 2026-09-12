import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const faqs = [
  {
    question: 'O acesso é realmente vitalício?',
    answer:
      'Sim. Você paga R$19,99 uma única vez e tem acesso a todo o conteúdo atual e a todas as atualizações futuras, sem pagar nada a mais.',
  },
  {
    question: 'Preciso ter experiência prévia?',
    answer:
      'Não. A trilha começa do absoluto zero, cobrindo lógica, algoritmos e fundamentos antes de avançar para frameworks e projetos complexos.',
  },
  {
    question: 'Como funciona o formato do curso?',
    answer:
      'Cada lição combina explicação escrita direta com código executável que você copia, cola e roda. Ao fim de cada módulo há exercícios práticos com soluções comentadas para você comparar sua abordagem.',
  },
  {
    question: 'Quais tecnologias vou aprender?',
    answer:
      'Python, JavaScript, TypeScript, React, FastAPI, MongoDB, Git, deploy e muito mais — tudo aplicado em projetos reais e exercícios práticos.',
  },
  {
    question: 'Quanto tempo tenho para concluir?',
    answer:
      'No seu ritmo. Como o acesso é vitalício, você pode estudar no tempo que tiver disponível, sem pressa e sem prazo de expiração.',
  },
  {
    question: 'E se eu não gostar?',
    answer:
      'Você tem 7 dias de garantia incondicional. Se não for para você, basta solicitar o reembolso e devolvemos 100% do valor.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useScrollAnimation<HTMLElement>({
    y: 30,
    stagger: 0.08,
  });

  return (
    <section
      ref={containerRef}
      className="px-4 sm:px-6 lg:px-8 py-fluid-section bg-surface-elevated/20"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span
            data-animate
            className="text-xs md:text-sm font-semibold text-brand-500 uppercase tracking-wider"
          >
            Dúvidas frequentes
          </span>
          <h2
            data-animate
            className="text-fluid-4xl font-bold text-text-primary mt-3 md:mt-4 tracking-tight"
          >
            Perguntas e respostas
          </h2>
        </div>

        <div className="space-y-2.5 md:space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                data-animate
                className="rounded-xl border border-border bg-surface-elevated overflow-hidden transition-colors hover:border-border-strong"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-4 md:p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm md:text-base font-semibold text-text-primary pr-2">
                    {faq.question}
                  </span>
                  <span className="shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-surface-overlay flex items-center justify-center">
                    {isOpen ? (
                      <Minus size={16} className="text-brand-500" />
                    ) : (
                      <Plus size={16} className="text-text-secondary" />
                    )}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 md:px-6 pb-4 md:pb-6 text-text-secondary leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}