'use client'

import React, { useRef } from 'react';
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { genNameProp } from "./FetchGenres";
import { genreEmoji } from "@/public/data/EmojiData";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface genDataFullProp {
    data: genDatProp;
    name: genNameProp;
}

export interface genDatProp {
    name: string;
    mal_id: number;
    count: number;
}

const GenCard = ({ data, name }: genDataFullProp) => {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const emoji = genreEmoji[data.name] || "🎬";

    useGSAP(() => {
        const card = cardRef.current;
        if (!card) return;

        const mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.fromTo(
                card,
                { autoAlpha: 0, y: 20 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 95%',
                        once: true,
                    },
                }
            );
        });

        mm.add("(prefers-reduced-motion: reduce)", () => {
            gsap.to(card, {
                autoAlpha: 1,
                duration: 0.4,
                scrollTrigger: { trigger: card, start: 'top 95%', once: true },
            });
        });

        return () => mm.revert();
    }, { scope: cardRef });

    return (
        <Link
            href={`/genres-${name}/${data.name.toLowerCase()}-${data.mal_id}`}
            ref={cardRef}
            className="group relative flex flex-col justify-between p-4 sm:p-5 h-28 sm:h-36 border border-border/50 bg-background transition-colors duration-300 md:hover:bg-foreground md:hover:text-background invisible"
        >
            {/* Top Row: Emoji & Count */}
            <div className="flex justify-between items-start">
                <span className="text-2xl sm:text-3xl opacity-80 transition-transform duration-500 ease-out md:group-hover:scale-110">
                    {emoji}
                </span>
                <span className="  text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground transition-colors duration-300 md:group-hover:text-background/70">
                    [{data.count.toLocaleString()}]
                </span>
            </div>

            {/* Bottom Row: Title & Arrow */}
            <div className="flex justify-between items-end">
                <h3 className="text-sm sm:text-base md:text-lg font-bold tracking-tight line-clamp-1 pr-2">
                    {data.name}
                </h3>

                {/* 
                    Arrow logic: 
                    - Mobile: Statically visible, standard color.
                    - Desktop (md+): Hidden by default, slides in and turns crimson on hover.
                */}
                <ArrowUpRight className="w-4 h-4 text-muted-foreground flex-shrink-0 transition-all duration-300 opacity-100 translate-x-0 translate-y-0 md:opacity-0 md:-translate-x-2 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-x-0 md:group-hover:translate-y-0 md:group-hover:text-[crimson]" />
            </div>
        </Link>
    );
};

export default GenCard;