import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { StudentHeader } from '../components/student/StudentHeader';
import { StudentFooter } from '../components/student/StudentFooter';
import { PageBackground } from '../components/ui/PageBackground';

export function Termos() {
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
            <FileText size={12} className="text-brand-500" />
            <span className="text-xs text-brand-300 font-medium">
              Termos de uso
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
            Termos de Uso
          </h1>
          <p className="text-text-secondary text-sm md:text-base">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        <div className="space-y-8 text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              1. Aceitação dos termos
            </h2>
            <p>
              Ao criar uma conta e utilizar a plataforma Devstack, você
              concorda com estes Termos de Uso. Se não concordar, não utilize
              os serviços.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              2. Descrição do serviço
            </h2>
            <p>
              O Devstack é uma plataforma de ensino de programação que oferece
              cursos com material escrito e exercícios práticos. O acesso é
              concedido mediante pagamento único e é{' '}
              <strong className="text-text-primary">vitalício</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              3. Conta do usuário
            </h2>
            <p className="mb-3">Você é responsável por:</p>
            <ul className="space-y-2 ml-5 list-disc">
              <li>Manter suas credenciais seguras</li>
              <li>Fornecer informações verdadeiras</li>
              <li>Não compartilhar sua conta com terceiros</li>
              <li>Todas as atividades realizadas na sua conta</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              4. Pagamento e acesso
            </h2>
            <ul className="space-y-2 ml-5 list-disc">
              <li>Pagamento único via Pix ou Cartão de Crédito</li>
              <li>Acesso liberado imediatamente após confirmação</li>
              <li>Acesso vitalício a todo o conteúdo atual e futuro</li>
              <li>Não há cobranças recorrentes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              5. Política de reembolso
            </h2>
            <p>
              Você tem até{' '}
              <strong className="text-text-primary">2 dias corridos</strong>{' '}
              após a compra para solicitar reembolso total. Saiba mais na
              página de{' '}
              <Link
                to="/reembolso"
                className="text-brand-500 hover:text-brand-400 underline"
              >
                Reembolso
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              6. Propriedade intelectual
            </h2>
            <p>
              Todo o conteúdo do curso (textos, exercícios, materiais) é
              propriedade do Devstack. É proibido:
            </p>
            <ul className="space-y-2 ml-5 list-disc mt-3">
              <li>Copiar, distribuir ou revender o conteúdo</li>
              <li>Compartilhar credenciais de acesso</li>
              <li>Usar o conteúdo para fins comerciais sem autorização</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              7. Uso aceitável
            </h2>
            <p>Você concorda em não:</p>
            <ul className="space-y-2 ml-5 list-disc mt-3">
              <li>Tentar burlar a segurança da plataforma</li>
              <li>Usar a plataforma para fins ilegais</li>
              <li>Prejudicar outros usuários</li>
              <li>Sobrecarregar os servidores com atividades maliciosas</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              8. Cancelamento e exclusão
            </h2>
            <p>
              Você pode solicitar a exclusão da sua conta a qualquer momento
              pelo e-mail{' '}
              <a
                href="mailto:feliperossidev@gmail.com"
                className="text-brand-500 hover:text-brand-400 underline"
              >
                feliperossidev@gmail.com
              </a>
              . Reservamo-nos o direito de suspender contas que violem estes
              termos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              9. Alterações nos termos
            </h2>
            <p>
              Podemos atualizar estes termos periodicamente. Alterações
              relevantes serão comunicadas por e-mail.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              10. Contato
            </h2>
            <p>
              Dúvidas sobre estes termos? Fale conosco:{' '}
              <a
                href="mailto:feliperossidev@gmail.com"
                className="text-brand-500 hover:text-brand-400 underline"
              >
                feliperossidev@gmail.com
              </a>
            </p>
          </section>
        </div>
      </main>

      <StudentFooter />
    </div>
  );
}