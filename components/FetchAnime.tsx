import AnimeCard from "./AnimeCard";
import MangaCard from "./MangaCard";

interface inputProp{
    limit: number,
    top: boolean,
    type: 'anime' | 'manga'
}


export interface AnimeResponse {
  data: Anime[];
}
export interface Anime {
  mal_id: number;
  images: AnimeImages;
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  title_synonyms: string[];
  type: string | null;

  episodes: number | null;
  status: string | null;
  rating: string | null;
  score: number | null;
  rank: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  genres: NameLink[];

}

/* ---- Sub Models ---- */

export interface AnimeImages {
  jpg: ImageFormat;
  webp: ImageFormat;
}

export interface ImageFormat {
  image_url: string | null;
  small_image_url: string | null;
  large_image_url: string | null;
}





export interface Title {
  type: string;
  title: string;
}



export interface NameLink {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}



const FetchAnime = async ({limit = 8, top=false, type = 'anime'}:inputProp) => {
    let baseURL = 'https://api.jikan.moe/v4/'
    if (top) {
        baseURL = `${baseURL}top/${type}?limit=${limit}`
    }else{
        baseURL = `${baseURL}${type}?limit=${limit}`
    }

    const response = await fetch(`${baseURL}`);
    const data = await response.json();
    const animes = data.data
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3">
            {
                type === 'anime' ? animes.map((item: Anime)=> <AnimeCard key={item.mal_id} data={item}/>) : <MangaCard/>
            }
        </div>
    );
};

export default FetchAnime;