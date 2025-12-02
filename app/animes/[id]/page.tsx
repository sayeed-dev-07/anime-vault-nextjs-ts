import AnimeDetails from "@/components/AnimeDetails";
import Spinner from "@/components/Spinner";
import { div } from "motion/react-client";

interface Props {
    params: Promise<{ id: string }>;
};

const PageAnime = async ({ params }: Props) => {
    const { id } = await params
    const animeFetch = async () => {
        const res = await fetch(`https://shikimori.one/api/animes/${id}`)
        return await res.json()
    }
    const animeData = await animeFetch()
    if (!animeData) {
        return (
            <div>
                <Spinner />
            </div>
        )
    }
    return (
        <div className="py-[3%]">
            <AnimeDetails prop={animeData} />
        </div>
    );
};

export default PageAnime;