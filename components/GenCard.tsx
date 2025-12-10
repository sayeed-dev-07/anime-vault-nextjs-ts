import Link from "next/link";
import { genNameProp } from "./FetchGenres";
interface genDataFullProp{
    data: genDatProp,
    name: genNameProp
}

export interface genDatProp{
    name: string,
    mal_id: number,
    count: number
}

const GenCard = ({data, name}:genDataFullProp) => {
    return (
        <Link href={`/genres-${name}/${data.name.toLowerCase()}-${data.mal_id}`} className="w-ful rounded-md bg-gen-card min-h-[200px] flex items-center justify-center flex-col border gap-y-2 cursor-pointer">
            <p className="text-2xl font-semibold">{data.name}</p>
            <p className="text-lg">{data.count} items</p>
        </Link>
    );
};

export default GenCard;