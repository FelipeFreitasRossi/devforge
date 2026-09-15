import { Link } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import { StudentHeader } from '../components/student/StudentHeader';
import { StudentFooter } from '../components/student/StudentFooter';
import { PageBackground } from '../components/ui/PageBackground';

export function Privacidade() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-500/30 bg-accent-500/5 mb-4">
            <Lock size={12} className="text-accent-500" />
            <span className="text-xs text-accent-300 font-medium">
              Privacidade
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
            Política de Privacidade
          </h1>
          <p className="text-text-secondary text-sm md:text-base">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        <div className="space-y-8 text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              1. Informações que coletamos
            </h2>
            <p className="mb-3">
              Coletamos apenas as informações necessárias para oferecer o
              serviço:
            </p>
            <ul className="space-y-2 ml-5 list-disc">
              <li>Nome completo</li>
              <li>Endereço de e-mail</li>
              <li>Dados de pagamento (processados pelo Mercado Pago)</li>
              <li>Progresso nos cursos e atividades na plataforma</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              2. Como usamos seus dados
            </h2>
            <ul className="space-y-2 ml-5 list-disc">
              <li>Criar e gerenciar sua conta</li>
              <li>Processar pagamentos e liberar o acesso</li>
              <li>Salvar seu progresso nas lições</li>
              <li>Enviar comunicações sobre o curso</li>
              <li>Melhorar a experiência na plataforma</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              3. Compartilhamento com terceiros
            </h2>
            <p className="mb-3">
              Seus dados <strong className="text-text-primary">nunca são vendidos</strong>. Compartilhamos
              apenas com parceiros essenciais:
            </p>
            <ul className="space-y-2 ml-5 list-disc">
              <li>
                <strong className="text-text-primary">Mercado Pago</strong> —
                para processar pagamentos
              </li>
              <li>
                <strong className="text-text-primary">MongoDB Atlas</strong> —
                para armazenar seus dados com segurança
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              4. Segurança dos dados
            </h2>
            <p>
              Utilizamos criptografia para senhas (bcrypt), conexões HTTPS e
              autenticação por token JWT. Seus dados são armazenados de forma
              segura em servidores com backup automático.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              5. Seus direitos (LGPD)
            </h2>
            <p className="mb-3">
              Conforme a Lei Geral de Proteção de Dados (LGPD), você tem
              direito a:
            </p>
            <ul className="space-y-2 ml-5 list-disc">
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar a exclusão da sua conta e dados</li>
              <li>Revogar consentimentos a qualquer momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              6. Contato
            </h2>
            <p>
              Para exercer seus direitos ou tirar dúvidas sobre privacidade,
              entre em contato pelo e-mail{' '}
              <a
                href="mailto:feliperossidev@gmail.com"
                className="text-brand-500 hover:text-brand-400 underline"
              >
                feliperossidev@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <StudentFooter />
    </div>
  );
}