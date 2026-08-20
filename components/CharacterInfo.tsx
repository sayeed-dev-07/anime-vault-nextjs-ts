import Image from 'next/image';
import React from 'react';
import { Heart, UserCircle } from 'lucide-react';

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
    return (
        <div className='smallCard opacity-0 bg-card border border-border rounded-2xl overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300'>

            {/* Aspect Ratio Image Container */}
            <div className='relative w-full aspect-[3/4] bg-muted overflow-hidden'>
                <Image
                    fill
                    className='object-cover transition-transform duration-500 ease-out group-hover:scale-110'
                    src={CharacterData.character.images.jpg.image_url}
                    loading="lazy"
                    sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw'
                    alt={CharacterData.character.name}
                />
            </div>

            {/* Card Content */}
            <div className='p-3 sm:p-4 flex flex-col gap-2.5'>
                <h4 className='font-bold text-sm sm:text-base leading-tight line-clamp-1 text-foreground' title={CharacterData.character.name}>
                    {CharacterData.character.name}
                </h4>

                <div className="flex flex-col gap-2">
                    <span className='flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md border border-border/50 w-fit'>
                        <UserCircle className="w-3.5 h-3.5" />
                        {CharacterData.role}
                    </span>
                    <span className='flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md border border-border/50 w-fit'>
                        <Heart className="w-3.5 h-3.5 text-[crimson]" />
                        {CharacterData.favorites.toLocaleString()}
                    </span>
                </div>
            </div>

        </div>
    );
};

export default CharacterInfo;