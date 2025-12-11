import Image from 'next/image';
import React from 'react';

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
        <div className='max-w-[400px] p-4 border rounded-xl ease-linear will-change-auto duration-200 group shadow-md hover:shadow-xl  transition-all'>
            <div className='w-full overflow-hidden h-[300px] relative mb-6'>
                <Image fill className='object-cover h-auto w-auto duration-200 will-change-auto  group-hover:grayscale-0 grayscale-70 group-hover:scale-105 transition-all  rounded-xl' src={CharacterData.character.images.jpg.image_url} loading="eager" sizes='100' alt={`${CharacterData.character.name}`} />
            </div>
            <div className='text-lg flex flex-col items-start justify-center gap-y-3'>
                <p>
                    <span className='font-semibold'>📝 Name: </span>{CharacterData.character.name}
                </p>
                <p>
                    <span className='font-semibold'>⛩️ Role: </span>{CharacterData.role}
                </p>
                <p>
                    <span className='font-semibold'>❤️ Favorites: </span>{CharacterData.favorites}
                </p>
            </div>
        </div>
    );
};

export default CharacterInfo;