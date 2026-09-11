import { Link } from 'react-router-dom';

const LOGO_URL = 'https://i.postimg.cc/0N6ThCRg/Logo-tecnologica-Dev-Forge.png';

export function Footer() {
  return (
    <footer className="border-t border-border bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 mb-8 md:mb-12">
          {/* Marca */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 md:gap-3 mb-4 md:mb-5">
              <img
                src={LOGO_URL}
                alt="DevForge"
                className="h-8 md:h-9 w-auto object-contain"
              />
              <span className="text-lg md:text-xl font-bold text-text-primary">
                Dev<span className="text-brand-500">Forge</span>
              </span>
            </Link>
            <p className="text-text-secondary text-sm max-w-sm leading-relaxed">
              A plataforma definitiva para quem quer aprender programação de
              verdade. Pague uma vez, acesse para sempre.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Plataforma
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/cursos"
                  className="text-text-secondary hover:text-brand-500 transition-colors"
                >
                  Cursos
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="text-text-secondary hover:text-brand-500 transition-colors"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-text-secondary hover:text-brand-500 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/termos"
                  className="text-text-secondary hover:text-brand-500 transition-colors"
                >
                  Termos de uso
                </Link>
              </li>
              <li>
                <Link
                  to="/privacidade"
                  className="text-text-secondary hover:text-brand-500 transition-colors"
                >
                  Privacidade
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="text-text-secondary hover:text-brand-500 transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} DevForge. Todos os direitos reservados.
          </p>
          <p className="text-sm text-text-muted">
            Feito com dedicação para devs de verdade.
          </p>
        </div>
      </div>
    </footer>
  );
}