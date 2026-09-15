import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  LifeBuoy,
  Shield,
  Sparkles,
  X,
  Mail,
} from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../ui/Button';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const LOGO_URL = 'https://i.postimg.cc/X7RLxfVm/3.png';
const EMAIL = 'feliperossidev@gmail.com';

const SOCIAL_LINKS = {
  whatsapp:
    'https://wa.me/5516996167381?text=Ol%C3%A1%2C%20Felipe.%20Gostaria%20de%20sanar%20uma%20duvida.',
  instagram: 'https://www.instagram.com/Fezinn_08',
  discord: 'https://discord.gg/pTAVzG6DU3',
  linkedin: 'https://www.linkedin.com/in/felipefreitasrossi/',
  github: 'https://github.com/FelipeFreitasRossi/devstack',
};

// ============ ÍCONES SVG ============
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function DiscordIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function GmailIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  );
}

// ============ CTA COM EFEITO DE SCROLL ============
function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const discordIconRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !glowRef.current || !discordIconRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      tl.fromTo(
        glowRef.current,
        { opacity: 0, x: 80 },
        { opacity: 1, x: 0, duration: 1.6, ease: 'power3.out' }
      );

      tl.fromTo(
        discordIconRef.current,
        { opacity: 0, scale: 0.8, x: 40 },
        { opacity: 1, scale: 1, x: 0, duration: 1.6, ease: 'power3.out' },
        '-=1.3'
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl border border-brand-500/30 bg-gradient-to-br from-brand-500/10 via-surface-elevated to-surface-elevated overflow-hidden p-6 sm:p-8 md:p-12"
    >
      <div
        ref={glowRef}
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{
          background: `
            radial-gradient(
              ellipse 90% 120% at 100% 50%,
              rgba(88, 101, 242, 0.95) 0%,
              rgba(88, 101, 242, 0.7) 18%,
              rgba(88, 101, 242, 0.4) 35%,
              rgba(88, 101, 242, 0.18) 55%,
              rgba(88, 101, 242, 0.06) 75%,
              transparent 95%
            )
          `,
        }}
      />

      <div
        ref={discordIconRef}
        aria-hidden
        className="absolute top-1/2 pointer-events-none opacity-0 select-none hidden sm:block"
        style={{
          right: '-100px',
          transform: 'translateY(-50%)',
          color: 'rgba(220, 228, 255, 0.35)',
          filter: 'drop-shadow(0 0 40px rgba(88, 101, 242, 0.6))',
        }}
      >
        <DiscordIcon size={240} />
      </div>

      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-64 h-64 sm:w-96 sm:h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(245, 158, 11, 0.4), transparent 70%)',
        }}
      />

      <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-8">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/5 mb-3 md:mb-4">
            <Sparkles size={12} className="text-brand-500" />
            <span className="text-[11px] md:text-xs text-brand-300 font-medium">
              Sua jornada continua
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary tracking-tight mb-3 leading-tight">
            Continue evoluindo como dev.
            <br />
            <span className="text-brand-500">Você está no caminho certo.</span>
          </h3>

          <p className="text-text-secondary text-xs sm:text-sm md:text-base max-w-xl leading-relaxed">
            Cada linha de código te leva mais perto da sua primeira vaga.
            Continue firme — o resultado vem com consistência.
          </p>
        </div>

        <div className="shrink-0 flex flex-col gap-2.5 md:gap-3 w-full md:w-auto">
          <Link to="/minha-area" className="w-full md:w-full">
            <Button size="lg" className="w-full group text-sm md:text-base">
              Continuar estudando
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>

          <a
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-lg border border-[#5865F2]/40 bg-[#5865F2]/10 hover:border-[#5865F2]/70 hover:bg-[#5865F2]/20 backdrop-blur-sm transition-all duration-300 text-sm md:text-base font-medium text-white"
          >
            <DiscordIcon size={18} />
            Entrar na comunidade
          </a>
        </div>
      </div>
    </div>
  );
}

// ============ MODAL DE CENTRAL DE AJUDA ============
function HelpModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isOpen) return;

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );

      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );

      const cards = cardsRef.current?.querySelectorAll('[data-card]');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.2,
            ease: 'power3.out',
          }
        );
      }
    },
    { dependencies: [isOpen], scope: modalRef }
  );

  if (!isOpen) return null;

  const channels = [
    {
      id: 'email',
      label: 'E-mail',
      description: 'Resposta em até 24h úteis',
      href: `mailto:${EMAIL}?subject=D%C3%BAvida%20sobre%20Devstack&body=Ol%C3%A1%2C%20Felipe.%20Gostaria%20de%20sanar%20uma%20d%C3%BAvida.`,
      icon: GmailIcon,
      color: '#EA4335',
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      description: 'Resposta rápida e direta',
      href: SOCIAL_LINKS.whatsapp,
      icon: WhatsAppIcon,
      color: '#25D366',
    },
    {
      id: 'discord',
      label: 'Discord',
      description: 'Canal #suporte da comunidade',
      href: SOCIAL_LINKS.discord,
      icon: DiscordIcon,
      color: '#5865F2',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        ref={modalRef}
        className="relative w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl border-t sm:border border-border bg-surface-elevated p-5 sm:p-6 md:p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(88, 101, 242, 0.6), transparent 70%)',
          }}
        />

        {/* Handle bar mobile */}
        <div className="sm:hidden w-12 h-1 rounded-full bg-border mx-auto mb-4" />

        <div className="relative flex items-start justify-between gap-4 mb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/5 mb-3">
              <LifeBuoy size={12} className="text-brand-500" />
              <span className="text-[11px] text-brand-300 font-medium">
                Central de ajuda
              </span>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-primary tracking-tight">
              Deseja tirar dúvida com qual servidor?
            </h3>
            <p className="text-text-secondary text-xs sm:text-sm mt-2">
              Escolha o canal que preferir.
            </p>
          </div>

          <button
            onClick={onClose}
            className="shrink-0 p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-overlay transition-colors"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        <div ref={cardsRef} className="relative space-y-2.5 sm:space-y-3">
          {channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <a
                key={channel.id}
                data-card
                href={channel.href}
                target={channel.id === 'email' ? undefined : '_blank'}
                rel={channel.id === 'email' ? undefined : 'noopener noreferrer'}
                className="group flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl border border-border bg-surface hover:border-border-strong hover:-translate-y-0.5 transition-all duration-300"
              >
                <div
                  className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{
                    background: `${channel.color}15`,
                    border: `1px solid ${channel.color}40`,
                    color: channel.color,
                  }}
                >
                  <Icon size={18} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary">
                    {channel.label}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5 truncate">
                    {channel.description}
                  </p>
                </div>

                <ArrowRight
                  size={16}
                  className="shrink-0 text-text-muted group-hover:text-brand-500 group-hover:translate-x-1 transition-all"
                />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============ COMPONENTE PRINCIPAL ============
export function StudentFooter() {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      <footer className="border-t border-border bg-black mt-12">
        {/* ===== CTA ===== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
          <CTASection />
        </div>

        {/* ===== LINKS ===== */}
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
              {/* Marca — full width no mobile */}
              <div className="col-span-2 lg:col-span-2">
                <Link
                  to="/minha-area"
                  className="flex items-center gap-2.5 group shrink-0 mb-3 sm:mb-4"
                >
                  <img
                    src={LOGO_URL}
                    alt="Devstack"
                    className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
                  />
                  <span className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
                    Dev<span className="text-brand-500">stack</span>
                  </span>
                </Link>

                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-sm">
                  A plataforma definitiva para quem quer aprender programação
                  de verdade. Pague uma vez, acesse para sempre.
                </p>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg border border-border bg-surface-elevated">
                    <Shield size={12} className="text-accent-500" />
                    <span className="text-[10px] sm:text-xs text-text-secondary font-medium">
                      Compra segura
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg border border-border bg-surface-elevated">
                    <Sparkles size={12} className="text-brand-500" />
                    <span className="text-[10px] sm:text-xs text-text-secondary font-medium">
                      Acesso vitalício
                    </span>
                  </div>
                </div>
              </div>

              {/* Plataforma */}
              <div>
                <h4 className="text-[10px] sm:text-xs font-bold text-text-primary uppercase tracking-wider mb-3 sm:mb-4">
                  Plataforma
                </h4>
                <ul className="space-y-2.5 sm:space-y-3">
                  <li>
                    <Link
                      to="/minha-area"
                      className="text-xs sm:text-sm text-text-secondary hover:text-brand-500 transition-colors inline-flex items-center gap-1.5"
                    >
                      <BookOpen size={12} className="sm:hidden" />
                      <BookOpen size={14} className="hidden sm:block" />
                      Minha área
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/perfil"
                      className="text-xs sm:text-sm text-text-secondary hover:text-brand-500 transition-colors"
                    >
                      Meu perfil
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/certificados"
                      className="text-xs sm:text-sm text-text-secondary hover:text-brand-500 transition-colors"
                    >
                      Certificados
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/conquistas"
                      className="text-xs sm:text-sm text-text-secondary hover:text-brand-500 transition-colors"
                    >
                      Conquistas
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Suporte */}
              <div>
                <h4 className="text-[10px] sm:text-xs font-bold text-text-primary uppercase tracking-wider mb-3 sm:mb-4">
                  Suporte
                </h4>
                <ul className="space-y-2.5 sm:space-y-3">
                  <li>
                    <a
                      href={SOCIAL_LINKS.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-text-secondary hover:text-brand-500 transition-colors inline-flex items-center gap-1.5"
                    >
                      <LifeBuoy size={12} className="sm:hidden" />
                      <LifeBuoy size={14} className="hidden sm:block" />
                      Discord
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-xs sm:text-sm text-text-secondary hover:text-brand-500 transition-colors inline-flex items-center gap-1.5"
                    >
                      <Mail size={12} className="sm:hidden" />
                      <Mail size={14} className="hidden sm:block" />
                      E-mail
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => setHelpOpen(true)}
                      className="text-xs sm:text-sm text-text-secondary hover:text-brand-500 transition-colors inline-flex items-center gap-1.5"
                    >
                      <LifeBuoy size={12} className="sm:hidden" />
                      <LifeBuoy size={14} className="hidden sm:block" />
                      Ajuda
                    </button>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div className="col-span-2 sm:col-span-1">
                <h4 className="text-[10px] sm:text-xs font-bold text-text-primary uppercase tracking-wider mb-3 sm:mb-4">
                  Legal
                </h4>
                <ul className="space-y-2.5 sm:space-y-3">
                  <li>
                    <Link
                      to="/termos"
                      className="text-xs sm:text-sm text-text-secondary hover:text-brand-500 transition-colors"
                    >
                      Termos de uso
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacidade"
                      className="text-xs sm:text-sm text-text-secondary hover:text-brand-500 transition-colors"
                    >
                      Privacidade
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/reembolso"
                      className="text-xs sm:text-sm text-text-secondary hover:text-brand-500 transition-colors"
                    >
                      Reembolso
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ===== REDES + COPYRIGHT ===== */}
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="flex flex-col gap-5 sm:gap-6">
              {/* Copyright */}
              <div className="text-center order-2 sm:order-1">
                <p className="text-[10px] sm:text-xs text-text-muted">
                  © {new Date().getFullYear()} Devstack. Todos os direitos
                  reservados.
                </p>
                <p className="text-[10px] sm:text-xs text-text-muted mt-1">
                  Feito com dedicação para devs de verdade.
                </p>
              </div>

              {/* Redes sociais */}
              <div className="flex flex-col items-center gap-3 order-1 sm:order-2">
                <span className="text-[10px] sm:text-xs text-text-muted uppercase tracking-widest font-medium">
                  Siga a Devstack
                </span>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <a
                    href={SOCIAL_LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="p-2 sm:p-2.5 rounded-lg border border-border bg-surface-elevated text-text-secondary hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/5 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <WhatsAppIcon size={16} />
                  </a>

                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="p-2 sm:p-2.5 rounded-lg border border-border bg-surface-elevated text-text-secondary hover:text-[#E4405F] hover:border-[#E4405F]/40 hover:bg-[#E4405F]/5 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <InstagramIcon size={16} />
                  </a>

                  <a
                    href={SOCIAL_LINKS.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Discord"
                    className="p-2 sm:p-2.5 rounded-lg border border-border bg-surface-elevated text-text-secondary hover:text-[#5865F2] hover:border-[#5865F2]/40 hover:bg-[#5865F2]/5 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <DiscordIcon size={16} />
                  </a>

                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="p-2 sm:p-2.5 rounded-lg border border-border bg-surface-elevated text-text-secondary hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/5 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <LinkedinIcon size={16} />
                  </a>

                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="p-2 sm:p-2.5 rounded-lg border border-border bg-surface-elevated text-text-secondary hover:text-white hover:border-white/40 hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <GithubIcon size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}