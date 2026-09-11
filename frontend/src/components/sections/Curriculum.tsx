import { CheckCircle2 } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const modules = [
  {
    number: '01',
    title: 'Fundamentos da Programação',
    topics: ['Lógica', 'Algoritmos', 'Git e GitHub', 'Terminal'],
  },
  {
    number: '02',
    title: 'Python do Zero ao Avançado',
    topics: ['Sintaxe', 'POO', 'APIs', 'Testes'],
  },
  {
    number: '03',
    title: 'Frontend Moderno',
    topics: ['HTML/CSS', 'JavaScript', 'React', 'TypeScript'],
  },
  {
    number: '04',
    title: 'Backend Profissional',
    topics: ['FastAPI', 'MongoDB', 'Autenticação', 'Deploy'],
  },
];

export function Curriculum() {
  const containerRef = useScrollAnimation<HTMLElement>({
    y: 40,
    stagger: 0.1,
  });

  return (
    <section
      ref={containerRef}
      // Depois — respiro controlado
    className="px-4 sm:px-6 lg:px-8 py-16 md:py-20"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span
            data-animate
            className="text-xs md:text-sm font-semibold text-brand-500 uppercase tracking-wider"
          >
            Currículo
          </span>
          <h2
            data-animate
            className="text-fluid-4xl font-bold text-text-primary mt-3 md:mt-4 mb-5 md:mb-6 tracking-tight"
          >
            Uma trilha completa, do zero ao deploy
          </h2>
          <p data-animate className="text-fluid-base text-text-secondary leading-relaxed">
            Módulos organizados em progressão lógica para você evoluir sem
            travar.
          </p>
        </div>

        <div className="space-y-3 md:space-y-4">
          {modules.map((module) => (
            <div
              key={module.number}
              data-animate
              className="group flex flex-col md:flex-row gap-4 md:gap-6 p-5 md:p-8 rounded-xl border border-border bg-surface-elevated hover:border-brand-500/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4 md:w-1/3">
                <span className="text-fluid-3xl font-bold text-brand-500/40 group-hover:text-brand-500 transition-colors font-mono leading-none">
                  {module.number}
                </span>
                <h3 className="text-fluid-xl font-semibold text-text-primary pt-1 md:pt-2">
                  {module.title}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3 md:w-2/3 md:content-start">
                {module.topics.map((topic) => (
                  <div
                    key={topic}
                    className="flex items-center gap-2 text-text-secondary"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-brand-500 shrink-0"
                    />
                    <span className="text-sm">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}