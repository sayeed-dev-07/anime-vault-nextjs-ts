'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, UserCircle } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface CharacterRole {
    character: Character;
    role: string;
    favorites: number;
    voice_actors: VoiceActor[];
}

export interface Character {
    mal_id: number;
    url: string;
    images: CharacterImages;
    name: string;
}

export interface CharacterImages {
    jpg: {
        image_url: string;
    };
    webp: {
        image_url: string;
        small_image_url: string;
    };
}

export interface VoiceActor {
    person: Person;
    language: string;
}

export interface Person {
    mal_id: number;
    url: string;
    images: PersonImages;
    name: string;
}

export interface PersonImages {
    jpg: {
        image_url: string;
    };
}

const CharacterInfo = ({ CharacterData }: { CharacterData: CharacterRole }) => {
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
        <div ref={cardRef} className='invisible flex flex-col group w-full'>

            {/* Minimalist Image Container with Grayscale Effect */}
            <div className='relative w-full aspect-[3/4] bg-muted overflow-hidden mb-3 ring-1 ring-border/50'>
                <Image
                    fill
                    className='object-cover'
                    src={CharacterData.character.images.jpg.image_url}
                    loading="lazy"
                    sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw'
                    alt={CharacterData.character.name}
                />
            </div>

            {/* Editorial Typography */}
            <div className='flex flex-col gap-1 px-1'>
                <h4 className='font-bold text-sm sm:text-base leading-tight line-clamp-1 text-foreground transition-colors group-hover:text-[crimson]' title={CharacterData.character.name}>
                    {CharacterData.character.name}
                </h4>

                <div className="flex items-center gap-3 mt-1">
                    <span className='flex items-center gap-1 text-[10px]   tracking-widest uppercase text-muted-foreground'>
                        <UserCircle className="w-3 h-3" />
                        {CharacterData.role}
                    </span>
                    <span className='flex items-center gap-1 text-[10px]   tracking-widest uppercase text-muted-foreground'>
                        <Heart className="w-3 h-3 text-[crimson]" />
                        {CharacterData.favorites.toLocaleString()}
                    </span>
                </div>
            </div>

        </div>
    );
};

export default CharacterInfo;