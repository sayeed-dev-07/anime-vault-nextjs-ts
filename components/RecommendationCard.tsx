'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from 'lucide-react';
import FormatSegment from './Format';
import ButtonSpin from './Button';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface Recommendation {
    entry: RecommendationEntry;
    votes: number;
}

export interface RecommendationEntry {
    mal_id: number;
    url: string;
    images: RecommendationImages;
    title: string;
}

export interface RecommendationImages {
    jpg: RecommendationImageSet;
    webp: RecommendationImageSet;
}

export interface RecommendationImageSet {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
}

export type linkName = 'animes' | 'mangas';

const RecommendationCard = ({ data, name = 'animes' }: { data: Recommendation, name?: linkName }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const card = cardRef.current;
        if (!card) return;

        // Pure opacity fade, no translation
        gsap.fromTo(
            card,
            { autoAlpha: 0 },
            {
                autoAlpha: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    once: true,
                },
            }
        );
    }, { scope: cardRef });

    return (
        <div ref={cardRef} className='invisible flex flex-col group h-full w-full'>

            {/* Sleek Image Container */}
            <div className='relative w-full aspect-[3/4] bg-muted overflow-hidden mb-3 ring-1 ring-border/50'>
                <Image
                    fill
                    className='object-cover'
                    src={data.entry.images.jpg.large_image_url}
                    loading="lazy"
                    sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw'
                    alt={data.entry.title}
                />
            </div>

            {/* Editorial Content */}
            <div className='flex flex-col gap-2 px-1 flex-grow'>
                <h4 className='font-bold text-sm sm:text-base leading-tight line-clamp-2 text-foreground transition-colors group-hover:text-[crimson]' title={data.entry.title}>
                    {data.entry.title}
                </h4>

                <span className='flex items-center gap-1.5 text-[10px]   tracking-widest uppercase text-muted-foreground'>
                    <Heart className="w-3 h-3 text-[crimson]" />
                    {data.votes.toLocaleString()} Votes
                </span>

                {/* Uses your new brutalist ButtonSpin */}
                <div className='mt-auto pt-3'>
                    <Link href={`/${name}/${FormatSegment(data.entry.title)}-${data.entry.mal_id}`} className="w-full block">
                        <ButtonSpin text="View Entry" />
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default RecommendationCard;