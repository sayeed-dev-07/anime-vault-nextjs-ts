'use client'

import React from 'react';
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { genNameProp } from "./FetchGenres";
import { genreEmoji } from "@/public/data/EmojiData";

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
    const emoji = genreEmoji[data.name] || "🎬";

    return (
        <Link
            href={`/genres-${name}/${data.name.toLowerCase()}-${data.mal_id}`}
            className="group relative flex flex-col justify-between p-4 sm:p-5 h-28 sm:h-36 border-[3px] border-foreground bg-card shadow-[4px_4px_0_var(--foreground)] transition-all duration-200 md:hover:-translate-y-1 md:hover:bg-[#f9c846] md:hover:text-[#161616]"
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
                <h3 className="text-sm sm:text-base md:text-lg leading-tight line-clamp-1 pr-2">
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
