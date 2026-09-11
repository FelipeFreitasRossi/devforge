import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollAnimationOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  start?: string;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const containerRef = useRef<T>(null);
  const {
    y = 40,
    opacity = 0,
    duration = 0.8,
    stagger = 0.1,
    start = 'top 90%',
  } = options;

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const elements = container.querySelectorAll('[data-animate]');
      if (!elements.length) return;

      // Usa gsap.set + gsap.to em vez de gsap.from
      // Isso evita o problema de elementos presos em opacity 0
      gsap.set(elements, { opacity, y });

      const tl = gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: 'play none none none', // NÃO reverte
          once: true, // dispara só uma vez
        },
      });

      // Fallback: se por algum motivo o ScrollTrigger não disparar,
      // força a visibilidade após 1s
      const fallback = setTimeout(() => {
        if (gsap.getProperty(elements[0], 'opacity') === 0) {
          gsap.set(elements, { opacity: 1, y: 0 });
          tl.kill();
        }
      }, 1500);

      return () => {
        clearTimeout(fallback);
        tl.kill();
      };
    },
    { scope: containerRef }
  );

  return containerRef;
}