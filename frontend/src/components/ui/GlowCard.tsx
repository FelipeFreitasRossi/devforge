import { useRef } from 'react';
import type { ReactNode } from 'react';

type GlowPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'right'
  | 'top';

interface GlowCardProps {
  children: ReactNode;
  color?: string;
  intensity?: number;
  position?: GlowPosition;
  className?: string;
  borderColor?: string;
}

export function GlowCard({
  children,
  color = 'rgba(245, 158, 11, 1)',
  intensity = 0.5,
  position = 'top-right',
  className = '',
  borderColor,
}: GlowCardProps) {
  const getGradient = () => {
    const positions: Record<GlowPosition, string> = {
      'top-right': '100% 0%',
      'top-left': '0% 0%',
      'bottom-right': '100% 100%',
      'bottom-left': '0% 100%',
      right: '100% 50%',
      top: '50% 0%',
    };

    return `
      radial-gradient(
        ellipse 80% 90% at ${positions[position]},
        ${color.replace('1)', `${intensity})`)} 0%,
        ${color.replace('1)', `${intensity * 0.7})`)} 20%,
        ${color.replace('1)', `${intensity * 0.4})`)} 40%,
        ${color.replace('1)', `${intensity * 0.15})`)} 65%,
        transparent 90%
      )
    `;
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl border bg-surface-elevated ${
        borderColor || 'border-border'
      } ${className}`}
    >
      {/* Glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: getGradient() }}
      />

      {/* Conteúdo */}
      <div className="relative">{children}</div>
    </div>
  );
}