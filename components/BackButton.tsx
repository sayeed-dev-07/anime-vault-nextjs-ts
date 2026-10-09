'use client';

import React, { useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const btnRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    if (!btnRef.current) return;

    // Strict opacity-only entrance animation, no translation/bounce
    gsap.fromTo(
      btnRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1, ease: 'power2.out', delay: 0.2 }
    );
  }, [pathname]); // Re-triggers the clean fade if the route changes

  // Hide back button on root
  if (pathname === '/') return null;

  return (
    <button
      ref={btnRef}
      onClick={() => router.back()}
      aria-label="Go back"
      className="
        group invisible flex items-center justify-center 
        w-12 h-12 sm:w-14 sm:h-14 
        bg-foreground text-background border border-foreground 
        rounded-none cursor-pointer
        transition-colors duration-300 ease-out
        hover:bg-background hover:text-foreground
        focus:outline-none focus:ring-1 focus:ring-[crimson] focus:ring-offset-2 focus:ring-offset-background
      "
    >
      <ArrowLeft
        className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ease-out group-hover:-translate-x-1"
      />
    </button>
  );
}