'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.timeline().to('.fade-element', { autoAlpha: 1, duration: 0.8, stagger: 0.18, ease: 'power2.out' });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="comic-panel comic-dots relative w-full min-h-[480px] md:min-h-[620px] mb-16 overflow-hidden flex flex-col justify-center items-center select-none mt-4 bg-[#c9e4db]">
            <div className="absolute -left-8 top-14 text-[8rem] sm:text-[13rem] leading-none text-[#f9c846] [-webkit-text-stroke:3px_#161616] rotate-[-18deg]">⚡</div>
            <div className="absolute -right-8 bottom-5 text-[9rem] sm:text-[15rem] leading-none text-[#e6392d] [-webkit-text-stroke:3px_#161616] rotate-[18deg]">✦</div>
            <div className="absolute top-7 right-7 sm:top-12 sm:right-12 w-24 h-24 sm:w-32 sm:h-32 bg-[#e6392d] border-[3px] border-[#161616] flex items-center justify-center text-center text-white comic-heading text-xs sm:text-base leading-tight rotate-[12deg] shadow-[4px_4px_0_#161616]">NEW<br />PICKS</div>

            <div className="relative z-20 flex flex-col items-center justify-center text-center w-full px-5">
                <p className="fade-element opacity-0 invisible bg-[#161616] text-[#fff8e7] px-4 py-2 text-xs sm:text-sm font-extrabold tracking-[0.16em] uppercase mb-6 -rotate-2">Your next obsession starts here</p>
                <h1 className="fade-element opacity-0 invisible comic-heading text-[clamp(3.8rem,12vw,10rem)] leading-[.82] uppercase text-[#e6392d] [-webkit-text-stroke:2px_#161616] sm:[-webkit-text-stroke:3px_#161616] [text-shadow:7px_7px_0_#161616] mb-10">ANIME<br /><span className="text-[#fff8e7]">VAULT</span></h1>
                <div className="fade-element opacity-0 invisible flex-wrap justify-center flex items-center gap-4 sm:gap-6">
                    <Link href="/animes" className="comic-button px-5 sm:px-7 py-3 bg-[#f9c846] text-[#161616] font-black uppercase tracking-wider text-xs sm:text-sm">Explore Anime</Link>
                    <Link href="/mangas" className="comic-button px-5 sm:px-7 py-3 bg-[#fff8e7] text-[#161616] font-black uppercase tracking-wider text-xs sm:text-sm">Read Manga</Link>
                </div>
            </div>

            <div className="fade-element opacity-0 invisible absolute bottom-5 z-20 w-full px-4 flex justify-center"><p className="text-[10px] sm:text-xs font-extrabold tracking-[.18em] text-center uppercase text-[#161616]">Watch • Read • Repeat</p></div>
        </section>
    );
}
