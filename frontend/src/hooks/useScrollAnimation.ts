import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollAnimationOptions {
  y?: number;
  x?: number;
  scale?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  delay?: number;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const containerRef = useRef<T>(null);
  const {
    y = 40,
    x = 0,
    scale = 1,
    opacity = 0,
    duration = 0.9,
    stagger = 0.12,
    start = 'top 90%',
    delay = 0,
  } = options;

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const elements = container.querySelectorAll('[data-animate]');
      if (!elements.length) return;

      gsap.set(elements, { opacity, y, x, scale });

      const tl = gsap.to(elements, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration,
        stagger,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start,
          once: true,
        },
      });

      // Fallback de segurança
      const fallback = setTimeout(() => {
        if (gsap.getProperty(elements[0], 'opacity') === 0) {
          gsap.set(elements, { opacity: 1, y: 0, x: 0, scale: 1 });
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