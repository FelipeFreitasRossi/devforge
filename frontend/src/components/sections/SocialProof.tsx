import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const stats = [
  { value: '2.400+', label: 'Alunos ativos' },
  { value: '180h', label: 'De conteúdo' },
  { value: '4.9/5', label: 'Avaliação média' },
  { value: '100%', label: 'Acesso vitalício' },
];

export function SocialProof() {
  const containerRef = useScrollAnimation<HTMLElement>({ y: 30, stagger: 0.1 });

  return (
    <section
      ref={containerRef}
      className="border-y border-border bg-surface-elevated/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {stats.map((stat) => (
            <div key={stat.label} data-animate className="text-center">
              <div className="text-fluid-3xl font-bold text-brand-500 mb-1.5 md:mb-2">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-text-secondary">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}