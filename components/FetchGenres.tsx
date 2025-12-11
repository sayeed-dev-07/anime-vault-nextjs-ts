import GenCard, { genDatProp } from "./GenCard";

export type genNameProp = 'anime' | 'manga';

const FetchGenres = async ({ name }: { name: genNameProp }) => {
  const res = await fetch(`https://api.jikan.moe/v4/genres/${name}`, {
  next: { revalidate: 60 * 3 } 
});
  const resJson = await res.json();

  const rawData: genDatProp[] = resJson.data;


  const uniqueData = Array.from(
    new Map(rawData.map((item) => [item.mal_id, item])).values()
  );

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 mb-10">
      {uniqueData.map((item) => (
        <GenCard key={item.mal_id} name={name} data={item} />
      ))}
    </div>
  );
};

export default FetchGenres;
