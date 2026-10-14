import CardDetailsMnga from '@/components/CardDetailsMnga';
import Error from '@/components/Error';
import type { Metadata } from 'next';
import { formatSlug, metaDescription } from '@/lib/seo';

type MangaMetadataResponse = {
    data?: { title?: string; title_english?: string | null; synopsis?: string | null };
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const mangaId = id.split('-').pop();
    const fallbackTitle = formatSlug(id.replace(/-\d+$/, ''));

    try {
        const response = await fetch(`https://api.tenrai.org/v1/manga/${mangaId}`);
        if (!response.ok) throw new globalThis.Error('Manga metadata request failed');
        const { data }: MangaMetadataResponse = await response.json();
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

    const res = await fetch(`https://api.tenrai.org/v1/manga/${mangaId}`)



    if (!res.ok) {
        return <div className='w-full min-h-[40vh] flex items-center justify-center'>
            <Error />
        </div>
    }

    const resData = await res.json();


    const mangaData = resData.data;

    return (
        <div>
            <CardDetailsMnga manga={mangaData} />
        </div>
    );
};

export default page;
