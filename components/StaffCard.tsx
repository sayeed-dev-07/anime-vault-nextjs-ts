import Image from "next/image";

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


const StaffCard = ({ Staff }: { Staff: StaffProp }) => {
    return (
        <div className='max-w-[400px] p-4 border rounded-xl ease-linear will-change-auto duration-200 group shadow-md hover:shadow-xl  transition-all'>
            <div className='w-full overflow-hidden h-[300px] relative mb-6'>
                <Image fill className='object-cover h-auto w-auto duration-200 will-change-auto  group-hover:grayscale-0 grayscale-70 group-hover:scale-105 transition-all  rounded-xl' src={Staff.person.images.jpg.image_url ?? '/placeholder.png'} loading="eager" sizes='100' alt={`${Staff.person.name}`} />
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