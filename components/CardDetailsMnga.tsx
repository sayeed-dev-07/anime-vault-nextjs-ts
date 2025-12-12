export interface MangaResponse {
  data: MangaData;
}

export interface MangaData {
  mal_id: number;
  url: string;
  images: MangaImages;
  approved: boolean;
  titles: MangaTitle[];
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  title_synonyms: string[];
  type: string | null;
  chapters: number | null;
  volumes: number | null;
  status: string | null;
  publishing: boolean;
  published: PublishedInfo;
  score: number | null;
  scored: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  synopsis: string | null;
  background: string | null;
  authors: MalEntity[];
  serializations: MalEntity[];
  genres: MalEntity[];
  explicit_genres: MalEntity[];
  themes: MalEntity[];
  demographics: MalEntity[];
}

export interface MangaImages {
  jpg: MangaImageSet;
  webp: MangaImageSet;
}

export interface MangaImageSet {
  image_url: string | null;
  small_image_url: string | null;
  large_image_url: string | null;
}

export interface MangaTitle {
  type: string;
  title: string;
}

export interface PublishedInfo {
  from: string | null;
  to: string | null;
  prop: PublishedProp;
  string: string | null;
}

export interface PublishedProp {
  from: PublishedDate;
  to: PublishedDate;
}

export interface PublishedDate {
  day: number | null;
  month: number | null;
  year: number | null;
}

export interface MalEntity {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}


import Image from 'next/image';
import ReadMoreText from './ReadMoreText';
import CharacterInfo, { CharacterRole } from './CharacterInfo';
import RecommendationCard, { Recommendation } from './RecommendationCard';
import { getRecAndCharData } from './Fetch';
import StaffCard, { StaffProp } from './StaffCard';
import Pagination from './Pagination';


const CardDetailsMnga = async ({ manga }: { manga: MangaData }) => {
  const Allgenres = [
    ...(manga.genres ?? []),
    ...(manga.themes ?? [])
  ]

  const characterData = await getRecAndCharData('manga', manga.mal_id, 'characters')
  const recommendationsData = await getRecAndCharData('manga', manga.mal_id, 'recommendations')

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Cover */}
        <div className="shrink-0">
          <Image
            src={manga.images.jpg.large_image_url ?? ""}
            width={320}
            height={480}
            alt={manga.title}
            className="rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Titles + Score */}
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-4xl font-bold">{manga.title}</h1>

          <div className="space-y-2 text-lg">
            {manga.title_english && (
              <p>
                ➤ <span className="font-semibold">English:</span>{" "}
                {manga.title_english}
              </p>
            )}

            {manga.title_japanese && (
              <p>
                ➤ <span className="font-semibold">Japanese:</span>{" "}
                {manga.title_japanese}
              </p>
            )}

            {manga.title_synonyms.length > 0 && (
              <p>
                ➤ <span className="font-semibold">Synonyms:</span>{" "}
                {manga.title_synonyms.join(", ")}
              </p>
            )}
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-5 text-lg">
            {manga.score && (
              <div>
                ⭐ <span className="font-semibold">Score:</span>{" "}
                {manga.score}
              </div>
            )}

            <div>
              🧮 <span className="font-semibold">Scored by:</span>{" "}
              {manga.scored_by ? manga.scored_by : '?'}
            </div>

            <div>
              🥇 <span className="font-semibold">Rank:</span> #{manga.rank ? manga.rank : '?'}
            </div>

            <div>
              📈 <span className="font-semibold">Popularity:</span>{" "}
              #{manga.popularity ? manga.popularity : '?'}
            </div>

            <div>
              ❤️ <span className="font-semibold">Favorites:</span>{" "}
              {manga.favorites ? manga.favorites : '?'}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-300 my-10" />

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-lg">
        <div className="space-y-3">

          <p>
            🎞️ <span className="font-semibold">Type:</span>{" "}
            {manga.type ? manga.type : '?'}
          </p>

          <p>
            📚 <span className="font-semibold">Volumes:</span>{" "}
            {manga.volumes ?? "?"}
          </p>

          <p>
            🔢 <span className="font-semibold">Chapters:</span>{" "}
            {manga.chapters ?? "?"}
          </p>

          <p>
            📡 <span className="font-semibold">Status:</span>{" "}
            {manga.status ?? '?'}
          </p>

          <p>
            🔥 <span className="font-semibold">Publishing:</span>{" "}
            {manga.publishing ? "Yes" : "No"}
          </p>
        </div>

        <div className="space-y-3">
          <p>
            ⏳ <span className="font-semibold">Published:</span>{" "}
            {manga.published.string ?? '?'}
          </p>

          <p>
            📆 <span className="font-semibold">Started:</span>{" "}
            {manga.published.prop.from.year
              ? `${manga.published.prop.from.day}/${manga.published.prop.from.month}/${manga.published.prop.from.year}`
              : "N/A"}
          </p>

          <p>
            🏁 <span className="font-semibold">Ended:</span>{" "}
            {manga.published.prop.to.year
              ? `${manga.published.prop.to.day}/${manga.published.prop.to.month}/${manga.published.prop.to.year}`
              : "N/A"}
          </p>

          {manga.demographics.length > 0 && (
            <p>
              👨‍👦 <span className="font-semibold">Demographic:</span>{" "}
              {manga.demographics[0].name}
            </p>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-300 my-10" />

      {/* Genres, Authors, Serialization */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-lg">

        {
          Allgenres.length > 0 &&
          <div>
            <h2 className="font-bold mb-2">🧩 Genres</h2>
            <ul className="list-disc ml-5">
              {Allgenres.map((g) => (
                <li key={g.mal_id}>{g.name}</li>
              ))}
            </ul>
          </div>
        }

        {
          manga.authors.length > 0 &&
          <div>
            <h2 className="font-bold mb-2">✍️ Authors</h2>
            <ul className="list-disc ml-5">
              {manga.authors.map((a) => (
                <li key={a.mal_id}>{a.name}</li>
              ))}
            </ul>
          </div>
        }

        {
          manga.serializations.length > 0 &&
          <div>
            <h2 className="font-bold mb-2">📰 Serialization</h2>
            <ul className="list-disc ml-5">
              {manga.serializations.map((s) => (
                <li key={s.mal_id}>{s.name}</li>
              ))}
            </ul>
          </div>
        }

      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-300 my-10" />

      {/* Synopsis */}
      <div>
        <h2 className="text-2xl font-bold mb-3">📖 Synopsis</h2>
        {manga.synopsis ? (
          <ReadMoreText text={manga.synopsis} maxChars={350} />
        ) : (
          <p className="text-lg text-gray-500">No synopsis available.</p>
        )}
      </div>

      {/* Background */}
      {manga.background && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-3">🧾 Background</h2>
          <ReadMoreText text={manga.background} maxChars={350} />
        </div>
      )}

      {
        characterData.length > 0 && 
        <div>

        <p className="sm:text-4xl text-2xl font-bold mt-10">🌌 Characters :</p>

        <Pagination data={characterData} name="characters" limit={8} />

      </div>
      }
      {
        recommendationsData.length > 0 && 
        <div>

        <p className="sm:text-4xl text-2xl font-bold sm:mt-12 mt-4">🌟 More Like This Manga :</p>

        <Pagination data={recommendationsData} name="recommendations" limit={8} />

      </div>
      }

    </div>
  );
};

export default CardDetailsMnga;