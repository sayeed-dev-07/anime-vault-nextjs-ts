
import FormatSegment from '@/components/Format';
import InfinityScroll from '@/components/InfinityScroll';
import type { Metadata } from 'next';
import { formatSlug } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const genre = formatSlug(id.replace(/-\d+$/, ''));

    return {
        title: `${genre} Manga`,
        description: `Browse ${genre.toLowerCase()} manga and discover your next story to read.`,
    };
}


const page = async ({ params }: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params;
    const allParts = id.split('-')
    const genId = allParts.pop()
    return (
        <div className=' max-w-[1600px] mx-auto  '>
            <p className='sm:text-6xl text-3xl mb-3'>{FormatSegment(allParts.join(' '))}</p>
            <div>
                <InfinityScroll randomIdnt='gen-manga' gener={true} name='mangaData' genID={Number(genId)} />
            </div>
        </div>
    );
};

export default page;
