'use client';

import { ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
};

const LenisProvider = ({ children }: Props) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Standard easeOutExpo
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // 2. Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Hook Lenis into GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert seconds to milliseconds
    });

    // 4. Disable GSAP's default lag smoothing (improves sync)
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Cleanup
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return (
    // Lenis doesn't require specific wrappers, 
    // so we can just return a fragment or a simple div.
    <>
      {children}
    </>
  );
};

export default LenisProvider;