import { useRef } from 'react';
import { Lottie } from 'lottie-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import slothAnimation from '../../assets/Slothsleeping.json';

interface SlothMascotProps {
  size?: number;
  className?: string;
  swing?: boolean;
  /** De onde o mascote "pende" visualmente.
   * 'top' = balanço gira a partir de cima (usar quando ele fica no topo da tela).
   * 'bottom' = balanço gira a partir de baixo (usar quando ele fica no rodapé). */
  anchor?: 'top' | 'bottom';
}

export function SlothMascot({
  size = 160,
  className = '',
  swing = true,
  anchor = 'top',
}: SlothMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const transformOrigin = anchor === 'bottom' ? 'bottom center' : 'top center';

  useGSAP(
    () => {
      if (!swing || !containerRef.current) return;
      gsap.to(containerRef.current, {
        rotate: 3,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin,
      });
    },
    { scope: containerRef, dependencies: [transformOrigin] }
  );

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: size, transformOrigin }}
    >
      <Lottie
        src={slothAnimation}
        autoplay
        loop
        style={{ width: size, height: size }}
      />
    </div>
  );
}