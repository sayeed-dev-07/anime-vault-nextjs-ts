import GenCard, { genDatProp } from "./GenCard";

export type genNameProp = 'anime' | 'manga';

const FetchGenres = async ({ name }: { name: genNameProp }) => {
  const res = await fetch(`https://api.tenrai.org/v1/genres/${name}`, {
    next: { revalidate: 60 * 3 }
  });

  const resJson = await res.json();
  const rawData: genDatProp[] = resJson.data || [];

  // Remove duplicates based on mal_id
  const uniqueData = Array.from(
    new Map(rawData.map((item) => [item.mal_id, item])).values()
  );

  return (
    <section className="max-w-[1600px] mx-auto pt-6 pb-16">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
        {uniqueData.map((item) => (
          <GenCard key={item.mal_id} name={name} data={item} />
        ))}
      </div>

    </section>
  );
};

export default FetchGenres;