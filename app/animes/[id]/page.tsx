import AnimeDetails from "@/app/components/AnimeDetails";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
};

const PageAnime = async ({ params }: Props) => {
  const { id } = await params;

  const animeFetch = async () => {
    const res = await fetch(`https://shikimori.one/api/animes/${id}`);
    return await res.json();
  };

  const animeData = await animeFetch();

  // 404 handler
  if (!animeData || animeData.error || !animeData.name) {
    notFound();
  }


  // ✔ Correct return inside the component
  return (
    <div className="py-[3%]">
      <AnimeDetails prop={animeData} />
    </div>
  );
};

export default PageAnime;
