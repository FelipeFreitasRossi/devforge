import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { StudentHeader } from '../components/student/StudentHeader';
import { StudentFooter } from '../components/student/StudentFooter';
import { PageBackground } from '../components/ui/PageBackground';

export function Reembolso() {
  return (
    <div className="min-h-screen relative">
      <PageBackground />
      <StudentHeader />

      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Link
          to="/minha-area"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Voltar
        </Link>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/5 mb-4">
            <RotateCcw size={12} className="text-brand-500" />
            <span className="text-xs text-brand-300 font-medium">
              Política de Reembolso
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
            Garantia de 2 dias
          </h1>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-3xl">
            Se por qualquer motivo você não estiver satisfeito com o Devstack,
            você pode solicitar o reembolso total em até{' '}
            <strong className="text-text-primary">2 dias corridos</strong> após
            a compra.
          </p>
        </div>

        <div className="space-y-6 mb-12">
          <div className="relative p-6 rounded-2xl border border-accent-500/30 bg-surface-elevated overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 80% 100% at 100% 0%, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
              }}
            />
            <div className="relative flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center">
                <ShieldCheck size={20} className="text-emerald-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-text-primary mb-2">
                  Sem burocracia, sem perguntas
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Você tem total liberdade para pedir reembolso sem precisar
                  justificar. Acreditamos que nosso produto fala por si só.
                </p>
              </div>
            </div>
          </div>

          <div className="relative p-6 rounded-2xl border border-border bg-surface-elevated overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 80% 100% at 100% 0%, rgba(245, 158, 11, 0.18) 0%, transparent 70%)',
              }}
            />
            <div className="relative flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-brand-500/15 border border-brand-500/40 flex items-center justify-center">
                <Clock size={20} className="text-brand-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-text-primary mb-2">
                  Prazo de 2 dias corridos
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  O prazo começa a contar a partir da confirmação do pagamento.
                  Após esse período, não é mais possível solicitar o reembolso.
                </p>
                <ul className="space-y-2">
                  {[
                    'Reembolso de 100% do valor pago',
                    'Devolução pelo mesmo método de pagamento',
                    'Processamento em até 5 dias úteis',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <CheckCircle2
                        size={14}
                        className="text-accent-500 shrink-0 mt-0.5"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="relative p-6 md:p-8 rounded-2xl border border-border bg-surface-elevated overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 100% at 100% 100%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            }}
          />
          <div className="relative">
            <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4">
              Como solicitar?
            </h2>
            <p className="text-sm text-text-secondary mb-4 leading-relaxed">
              Entre em contato pelo e-mail{' '}
              <a
                href="mailto:feliperossidev@gmail.com?subject=Solicita%C3%A7%C3%A3o%20de%20Reembolso%20-%20Devstack"
                className="text-brand-500 hover:text-brand-400 font-medium underline"
              >
                feliperossidev@gmail.com
              </a>{' '}
              com o assunto{' '}
              <strong className="text-text-primary">
                "Solicitação de Reembolso"
              </strong>{' '}
              informando o e-mail usado na compra.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Nossa equipe vai processar sua solicitação o mais rápido
              possível.
            </p>
          </div>
        </div>
      </main>

      <StudentFooter />
    </div>
  );
}