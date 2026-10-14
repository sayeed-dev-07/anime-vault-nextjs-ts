'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.to('.fade-element', {
            autoAlpha: 1,
            duration: 1.2,
            stagger: 0.4,
            ease: 'none',
        });
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[60vh] min-h-[450px] md:h-[80vh] md:min-h-[600px] mb-16 overflow-hidden flex flex-col justify-center items-center select-none rounded-3xl mt-4"
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://i.pinimg.com/736x/9a/77/ca/9a77ca09599e9f214864a326117751e5.jpg"
                    alt="Aesthetic Anime Background"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
            </div>

            {/* The Shade / Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-10" />

            {/* Main Center Content */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center w-full px-4">
                <p className="fade-element opacity-0 invisible text-white/80 text-sm sm:text-base tracking-[0.4em] uppercase mb-4">
                    A Personal Collection
                </p>

                {/* Massive Title */}
                <h1 className="fade-element opacity-0 invisible text-5xl sm:text-[clamp(4rem,min(15vw,25vh),12rem)] leading-[0.85] font-black uppercase wrap-break-word text-[crimson]/90 drop-shadow-2xl mb-10 tracking-tighter">
                    AniSearch
                </h1>

                {/* Simple, flat buttons with no hover animations */}
                <div className="fade-element opacity-0 invisible flex-wrap justify-center flex items-center gap-4 sm:gap-6">
                    <Link
                        href="/animes"
                        className="px-6 sm:px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs"
                    >
                        Explore Anime
                    </Link>
                    <Link
                        href="/mangas"
                        className="px-6 sm:px-8 py-3 border border-white text-white font-bold uppercase tracking-widest text-xs"
                    >
                        Read Manga
                    </Link>
                </div>
            </div>

            {/* Bottom Credits */}
            <div className="fade-element opacity-0 invisible absolute bottom-4 sm:bottom-6 z-20 w-full px-4 sm:px-8 flex flex-col items-center">
                <p className="text-[7px] sm:text-[10px] text-white/50 tracking-widest text-center max-w-3xl leading-relaxed uppercase hidden sm:block">
                    Directed by Sayeed • Produced in Next.js • Animated with GSAP <br />
                    Featuring Top Anime • Trending Manga • Detailed Character Profiles • Global Search Engine <br />
                    © 2026 AniSearch Database. All rights reserved. Do not distribute without authorization.
                </p>
                <p className="text-[7px] text-white/50 tracking-widest text-center leading-relaxed uppercase sm:hidden">
                    Directed by Sayeed • Produced in Next.js <br />
                    © 2026 AniSearch Database.
                </p>
            </div>
        </section>
    );
}