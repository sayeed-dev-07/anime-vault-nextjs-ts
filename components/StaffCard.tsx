'use client';

import React, { useRef } from 'react';
import Image from "next/image";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface StaffProp {
    person: StaffPerson;
    positions: string[];
}

export interface StaffPerson {
    mal_id: number;
    images: {
        jpg: {
            image_url: string | null;
        };
    };
    name: string;
}

const StaffCard = ({ Staff }: { Staff: StaffProp }) => {
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
                    src={Staff.person.images.jpg.image_url ?? '/placeholder.png'}
                    loading="lazy"
                    sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw'
                    alt={Staff.person.name}
                />
            </div>

            {/* Editorial Typography */}
            <div className='flex flex-col gap-1 px-1'>
                <h4 className='font-bold text-sm sm:text-base leading-tight line-clamp-1 text-foreground transition-colors group-hover:text-[crimson]' title={Staff.person.name}>
                    {Staff.person.name}
                </h4>

                <span className='flex items-center gap-1.5 text-[10px]   tracking-widest uppercase text-muted-foreground line-clamp-1' title={Staff.positions.join(', ')}>
                    <Briefcase className="w-3 h-3 shrink-0" />
                    {Staff.positions[0]} {Staff.positions.length > 1 && <span className="opacity-50">(+{Staff.positions.length - 1})</span>}
                </span>
            </div>

        </div>
    );
};

export default StaffCard;