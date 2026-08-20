import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { genNameProp } from "./FetchGenres";
import { genreEmoji } from "@/public/data/EmojiData"; // Importing your emoji list!

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
    // Automatically match the genre name to an emoji, fallback to a default icon
    const emoji = genreEmoji[data.name] || "🎬";

    return (
        <Link 
            href={`/genres-${name}/${data.name.toLowerCase()}-${data.mal_id}`} 
            className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-secondary/30 p-6 text-center transition-all duration-300 hover:border-[crimson]/50 hover:bg-secondary hover:shadow-md hover:-translate-y-1 overflow-hidden"
        >
            {/* Genre Emoji */}
            <span className="text-4xl sm:text-5xl transition-transform duration-300 group-hover:scale-110">
                {emoji}
            </span>
            
            {/* Text Content */}
            <div className="flex flex-col gap-1">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground line-clamp-1">
                    {data.name}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                    {/* toLocaleString adds nice commas to large numbers (e.g. 10,432 items) */}
                    {data.count.toLocaleString()} items
                </p>
            </div>

            {/* Hover Arrow Indicator */}
            <div className="absolute bottom-3 right-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-3">
                <ArrowRight className="w-5 h-5 text-[crimson]" />
            </div>
            
            {/* Subtle Top Gradient for depth */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[crimson]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>
    );
};

export default GenCard;