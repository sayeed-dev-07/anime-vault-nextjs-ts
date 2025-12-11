import Link from "next/link";
import { genNameProp } from "./FetchGenres";
interface genDataFullProp {
    data: genDatProp,
    name: genNameProp
}

export interface genDatProp {
    name: string,
    mal_id: number,
    count: number
}

const GenCard = ({ data, name }: genDataFullProp) => {
    return (

            <Link href={`/genres-${name}/${data.name.toLowerCase()}-${data.mal_id}`} className="w-ful rounded-md bg-gen-card min-h-[200px] flex items-center justify-center flex-col border gap-y-2 cursor-pointer hover:opacity-50 relative group duration-200">
                <p className="text-2xl font-semibold">{data.name}</p>
                <p className="text-lg">{data.count} items</p>
                <div className="h-full w-full absolute z-20  group-hover:opacity-80 opacity-0 flex items-center justify-center rounded-md bg-card duration-200">
                    <p className="text-xl">
                        Browse
                    </p>
                </div>
            </Link>
    );
};

export default GenCard;