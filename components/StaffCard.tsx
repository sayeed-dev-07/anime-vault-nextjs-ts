'use client';

import Image from "next/image";
import { Briefcase } from "lucide-react";

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
    return (
        <div className='smallCard opacity-0 bg-card border border-border rounded-2xl overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300'>
            
            <div className='relative w-full aspect-[3/4] bg-muted overflow-hidden'>
                <Image 
                    fill 
                    className='object-cover transition-transform duration-500 ease-out group-hover:scale-110' 
                    src={Staff.person.images.jpg.image_url ?? '/placeholder.png'} 
                    loading="lazy" 
                    sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw' 
                    alt={Staff.person.name} 
                />
            </div>
            
            <div className='p-3 sm:p-4 flex flex-col gap-2.5'>
                <h4 className='font-bold text-sm sm:text-base leading-tight line-clamp-1 text-foreground' title={Staff.person.name}>
                    {Staff.person.name}
                </h4>
                
                <span className='flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md border border-border/50 w-fit line-clamp-1' title={Staff.positions.join(', ')}>
                    <Briefcase className="w-3.5 h-3.5 shrink-0" /> 
                    {Staff.positions[0]} {Staff.positions.length > 1 && <span className="opacity-70">(+{Staff.positions.length - 1})</span>}
                </span>
            </div>

        </div>
    );
};

export default StaffCard;