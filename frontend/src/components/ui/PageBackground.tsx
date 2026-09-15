/**
 * Fundo minimalista inspirado no Linear/Vercel.
 * Base quase preta + um único glow sutil + grain discreto.
 */
export function PageBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      style={{ backgroundColor: '#050506' }}
    >
      {/* ===== GLOW ÚNICO NO TOPO — âmbar muito sutil ===== */}
      <div
        className="absolute inset-x-0 top-0 h-[60vh]"
        style={{
          background: `
            radial-gradient(
              ellipse 90% 100% at 50% 0%,
              rgba(245, 158, 11, 0.10) 0%,
              rgba(245, 158, 11, 0.04) 25%,
              rgba(245, 158, 11, 0.01) 45%,
              transparent 65%
            )
          `,
        }}
      />

      {/* ===== TOQUE AZUL MUITO SUTIL EMBAIXO ===== */}
      <div
        className="absolute inset-x-0 bottom-0 h-[50vh]"
        style={{
          background: `
            radial-gradient(
              ellipse 70% 100% at 50% 100%,
              rgba(59, 130, 246, 0.06) 0%,
              rgba(59, 130, 246, 0.02) 30%,
              transparent 60%
            )
          `,
        }}
      />

      {/* ===== NOISE/GRAIN (acabamento premium) ===== */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      {/* ===== VINHETA MUITO SUTIL ===== */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 120% 100% at 50% 50%,
              transparent 50%,
              rgba(0, 0, 0, 0.25) 100%
            )
          `,
        }}
      />
    </div>
  );
}