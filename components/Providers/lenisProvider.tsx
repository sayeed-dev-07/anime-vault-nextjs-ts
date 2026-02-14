'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
};

const LenisProvider = ({ children }: Props) => {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Lenis and wire it to GSAP
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Standard easeOutExpo
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    // Hook Lenis into GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert seconds to milliseconds
    });

    // Disable GSAP's default lag smoothing (improves sync)
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Cleanup
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  useEffect(() => {
    // Reset scroll to top whenever the route changes
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname]);

  return (
    // Lenis doesn't require specific wrappers, 
    // so we can just return a fragment or a simple div.
    <>
      {children}
    </>
  );
};

export default LenisProvider;
