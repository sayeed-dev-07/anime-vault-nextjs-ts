
import CardDetails from '@/components/CardDetails';
import type { Metadata } from 'next';
import { formatSlug, metaDescription } from '@/lib/seo';

type AnimeMetadataResponse = {
    data?: { title?: string; title_english?: string | null; synopsis?: string | null };
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const animeId = id.split('-').pop();
    const fallbackTitle = formatSlug(id.replace(/-\d+$/, ''));

    try {
        const response = await fetch(`https://api.tenrai.org/v1/anime/${animeId}`);
        if (!response.ok) throw new Error('Anime metadata request failed');
        const { data }: AnimeMetadataResponse = await response.json();
        const title = data?.title_english || data?.title || fallbackTitle;

        return {
            title,
            description: metaDescription(data?.synopsis, `Explore ${title}, including its synopsis, genres, and more.`),
        };
    } catch {
        return {
            title: fallbackTitle,
            description: `Explore ${fallbackTitle}, including its synopsis, genres, and more.`,
        };
    }
}


const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const mangaId = id.split('-').pop();
    const res = await fetch(`https://api.tenrai.org/v1/anime/${mangaId}`)
    const resData = await res.json();
    const animeData = resData.data;
    return (
        <div>
            {
                <CardDetails anime={animeData} />
            }
        </div>
    );
};

export default page;
