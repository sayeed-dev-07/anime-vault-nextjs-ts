'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

export interface StaffProp {
    person: StaffPerson;
    positions: string[]
}
export interface StaffPerson {
    mal_id: number,
    images: {
        jpg: {
            image_url: string | null;
        }
    },
    name: string;
}


gsap.registerPlugin(useGSAP)


const StaffCard = ({ Staff }: { Staff: StaffProp }) => {
    

    return (
        <div className='max-w-[400px] smallCard p-4 border  opacity-0'>
            <div className='w-full overflow-hidden h-[300px] relative mb-6'>
                <Image fill className='object-cover h-auto w-auto ' src={Staff.person.images.jpg.image_url ?? '/placeholder.png'} loading="eager" sizes='100' alt={`${Staff.person.name}`} />
            </div>
            <div className='text-lg flex flex-col items-start justify-center gap-y-3'>
                <p>
                    <span className='font-semibold'>📝 Name: </span>{Staff.person.name}
                </p>
                <p>
                    <span className='font-semibold'>🎬 Position: </span>{Staff.positions.join(' | ')}
                </p>
            </div>
        </div>
    );
};

export default StaffCard;