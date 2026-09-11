import {
  Code2,
  Rocket,
  Users,
  Infinity as InfinityIcon,
  Trophy,
  BookOpen,
  Check,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Award,
  Target,
} from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const primaryFeatures = [
  {
    icon: Code2,
    badge: 'Aprenda na prática',
    title: 'Projetos reais do mercado',
    description:
      'Nada de exercícios soltos. Você constrói aplicações completas — do banco de dados ao deploy — que vão direto para o seu portfólio.',
    bullets: [
      'Mais de 20 projetos guiados',
      'Código-fonte completo incluso',
      'Padrões usados em empresas reais',
    ],
  },
  {
    icon: Rocket,
    badge: 'Do zero ao profissional',
    title: 'Trilha estruturada sem buracos',
    description:
      'Uma progressão lógica que te leva da lógica de programação até arquitetura avançada, sem pular etapas e sem te deixar travado.',
    bullets: [
      'Começa do absoluto zero',
      'Sem pré-requisitos',
      'Progressão validada por devs seniores',
    ],
  },
];

const secondaryFeatures = [
  {
    icon: InfinityIcon,
    title: 'Acesso vitalício',
    description: 'Pague uma vez. Acesse tudo hoje e para sempre.',
    accent: 'brand',
  },
  {
    icon: Users,
    title: 'Comunidade ativa',
    description: 'Tire dúvidas e cresça junto com outros devs.',
    accent: 'accent',
  },
  {
    icon: Trophy,
    title: 'Certificado válido',
    description: 'Comprove suas habilidades no currículo e no LinkedIn.',
    accent: 'brand',
  },
  {
    icon: BookOpen,
    title: 'Sempre atualizado',
    description: 'Conteúdo revisado para acompanhar o mercado.',
    accent: 'accent',
  },
];

const differentials = [
  {
    icon: Zap,
    title: 'Aprendizado acelerado',
    description: 'Método focado no que o mercado realmente pede.',
  },
  {
    icon: Shield,
    title: 'Garantia de 7 dias',
    description: 'Não gostou? Devolvemos 100% do valor. Sem perguntas.',
  },
  {
    icon: Clock,
    title: 'Estude no seu ritmo',
    description: 'Sem prazos, sem pressão. Você decide quando avançar.',
  },
  {
    icon: TrendingUp,
    title: 'Foco em empregabilidade',
    description: 'Portfólio, LinkedIn e entrevistas técnicas inclusos.',
  },
  {
    icon: Award,
    title: 'Reconhecimento no mercado',
    description: 'Certificados aceitos por empresas de tecnologia.',
  },
  {
    icon: Target,
    title: 'Mentoria direcionada',
    description: 'Suporte para tirar dúvidas e acelerar sua evolução.',
  },
];

export function Features() {
  const containerRef = useScrollAnimation<HTMLElement>({
    y: 40,
    stagger: 0.08,
  });

  return (
    <section
      ref={containerRef}
      className="relative px-4 sm:px-6 lg:px-8 py-fluid-section overflow-hidden"
    >
      {/* Glow sutil de fundo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245, 158, 11, 0.10), transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <span
            data-animate
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-brand-500 uppercase tracking-wider mb-4"
          >
            <span className="w-8 h-px bg-brand-500" />
            Por que a DevForge
          </span>

          <h2
            data-animate
            className="text-fluid-4xl font-bold text-text-primary leading-[1.1] tracking-tight mb-5 md:mb-6"
          >
            Você não precisa de mais um curso.
            <br />
            <span className="text-brand-500">
              Precisa de uma formação de verdade.
            </span>
          </h2>

          <p
            data-animate
            className="text-fluid-base text-text-secondary leading-relaxed max-w-2xl"
          >
            A maioria dos cursos te ensina a copiar código. A DevForge te
            ensina a{' '}
            <strong className="text-text-primary font-semibold">
              pensar como dev
            </strong>{' '}
            — construindo projetos reais, entendendo cada decisão e evoluindo
            no seu ritmo, sem assinatura mensal.
          </p>
        </div>

        {/* Features principais — 2 destaque grande, com cor forte */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 mb-5 md:mb-6">
  {primaryFeatures.map((feature, index) => {
    const Icon = feature.icon;
    const isFirst = index === 0;
    return (
      <article
        key={feature.title}
        data-animate
        className="group relative flex flex-col p-6 md:p-8 rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: isFirst
            ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.18) 0%, rgba(24, 24, 27, 1) 60%)'
            : 'linear-gradient(135deg, rgba(59, 130, 246, 0.18) 0%, rgba(24, 24, 27, 1) 60%)',
          border: isFirst
            ? '1.5px solid rgba(245, 158, 11, 0.6)'
            : '1.5px solid rgba(59, 130, 246, 0.6)',
          boxShadow: isFirst
            ? '0 0 60px -15px rgba(245, 158, 11, 0.5), inset 0 1px 0 0 rgba(245, 158, 11, 0.2)'
            : '0 0 60px -15px rgba(59, 130, 246, 0.5), inset 0 1px 0 0 rgba(59, 130, 246, 0.2)',
        }}
      >
        {/* Barra superior colorida */}
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: isFirst
              ? 'linear-gradient(90deg, transparent, #f59e0b, transparent)'
              : 'linear-gradient(90deg, transparent, #3b82f6, transparent)',
          }}
        />

        {/* Glow grande no canto */}
        <div
          aria-hidden
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{
            background: isFirst
              ? 'rgba(245, 158, 11, 0.25)'
              : 'rgba(59, 130, 246, 0.25)',
          }}
        />

        {/* Ícone + Badge */}
        <div className="flex items-start justify-between gap-4 mb-6 relative">
          <div
            className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
            style={{
              background: isFirst
                ? 'rgba(245, 158, 11, 0.2)'
                : 'rgba(59, 130, 246, 0.2)',
              border: isFirst
                ? '1.5px solid rgba(245, 158, 11, 0.5)'
                : '1.5px solid rgba(59, 130, 246, 0.5)',
            }}
          >
            <Icon
              size={28}
              style={{ color: isFirst ? '#f59e0b' : '#3b82f6' }}
            />
          </div>
          <span
            className="text-[10px] md:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
            style={{
              color: isFirst ? '#fbbf24' : '#93c5fd',
              background: isFirst
                ? 'rgba(245, 158, 11, 0.15)'
                : 'rgba(59, 130, 246, 0.15)',
              border: isFirst
                ? '1px solid rgba(245, 158, 11, 0.5)'
                : '1px solid rgba(59, 130, 246, 0.5)',
            }}
          >
            {feature.badge}
          </span>
        </div>

        {/* Conteúdo */}
        <h3 className="text-fluid-xl md:text-fluid-2xl font-bold text-text-primary mb-3 md:mb-4 relative">
          {feature.title}
        </h3>
        <p className="text-text-secondary leading-relaxed text-sm md:text-base mb-6 relative">
          {feature.description}
        </p>

        {/* Bullets */}
        <ul className="space-y-2.5 mt-auto relative">
          {feature.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  background: isFirst
                    ? 'rgba(245, 158, 11, 0.25)'
                    : 'rgba(59, 130, 246, 0.25)',
                }}
              >
                <Check
                  size={12}
                  style={{ color: isFirst ? '#f59e0b' : '#3b82f6' }}
                  strokeWidth={3}
                />
              </span>
              <span className="text-sm text-text-secondary font-medium">
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      </article>
    );
  })}
</div>

        {/* Features secundárias */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-14 md:mb-20">
          {secondaryFeatures.map((feature) => {
            const Icon = feature.icon;
            const isAccent = feature.accent === 'accent';
            return (
              <article
                key={feature.title}
                data-animate
                className="group flex flex-col p-5 md:p-6 rounded-xl border border-border bg-surface-elevated hover:border-border-strong hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                    isAccent
                      ? 'bg-accent-500/10 border border-accent-500/30 group-hover:bg-accent-500/20'
                      : 'bg-brand-500/10 border border-brand-500/30 group-hover:bg-brand-500/20'
                  }`}
                >
                  <Icon
                    size={20}
                    className={isAccent ? 'text-accent-500' : 'text-brand-500'}
                  />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-text-primary mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* Divisor com texto */}
        <div
          data-animate
          className="flex items-center gap-4 md:gap-6 mb-10 md:mb-14"
        >
          <span className="flex-1 h-px bg-gradient-to-r from-transparent via-border-strong to-border-strong" />
          <span className="text-xs md:text-sm font-semibold text-text-muted uppercase tracking-wider whitespace-nowrap">
            E tem mais
          </span>
          <span className="flex-1 h-px bg-gradient-to-l from-transparent via-border-strong to-border-strong" />
        </div>

        {/* Grid de diferenciais — 6 itens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-8 md:gap-y-10 mb-14 md:mb-20">
          {differentials.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                data-animate
                className="group flex items-start gap-4"
              >
                <div className="shrink-0 w-11 h-11 rounded-lg bg-surface-elevated border border-border flex items-center justify-center group-hover:border-brand-500/50 group-hover:bg-brand-500/5 transition-all">
                  <Icon size={20} className="text-brand-500" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-semibold text-text-primary mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bloco de comparação — DevForge vs cursos comuns */}
        <div
          data-animate
          className="relative rounded-2xl border border-border bg-surface-elevated overflow-hidden mb-14 md:mb-20"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              background:
                'radial-gradient(ellipse 60% 80% at 100% 50%, rgba(245, 158, 11, 0.15), transparent 70%)',
            }}
          />

          <div className="relative grid grid-cols-1 md:grid-cols-2">
            {/* Coluna: cursos comuns */}
            <div className="p-6 md:p-10 border-b md:border-b-0 md:border-r border-border">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                Cursos comuns
              </span>
              <h3 className="text-fluid-xl font-bold text-text-secondary mt-3 mb-6">
                O que você já tentou antes
              </h3>
              <ul className="space-y-3.5">
                {[
                  'Assinatura mensal que nunca acaba',
                  'Conteúdo raso e desatualizado',
                  'Exercícios soltos sem contexto',
                  'Você termina e não sabe fazer nada sozinho',
                  'Zero suporte quando trava',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-text-muted"
                  >
                    <span className="shrink-0 w-5 h-5 rounded-full bg-surface-overlay flex items-center justify-center text-text-muted text-xs mt-0.5">
                      ✕
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna: DevForge */}
            <div className="p-6 md:p-10">
              <span className="text-xs font-semibold text-brand-500 uppercase tracking-wider">
                DevForge
              </span>
              <h3 className="text-fluid-xl font-bold text-text-primary mt-3 mb-6">
                O que você tem aqui
              </h3>
              <ul className="space-y-3.5">
                {[
                  'Pagamento único, acesso vitalício',
                  'Conteúdo profundo e sempre atualizado',
                  'Projetos completos do zero ao deploy',
                  'Você sai pronto para o mercado',
                  'Comunidade e mentoria ativas',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-text-primary"
                  >
                    <span className="shrink-0 w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center mt-0.5">
                      <Check size={12} className="text-brand-500" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA contextual */}
        <div
          data-animate
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 text-center"
        >
          <p className="text-text-secondary text-sm md:text-base">
            Pronto para começar sua jornada?
          </p>
          <a
            href="#pricing"
            className="group inline-flex items-center gap-2 text-brand-500 hover:text-brand-400 font-semibold text-sm md:text-base transition-colors"
          >
            Ver o plano vitalício
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>
      </div>
    </section>
  );
}