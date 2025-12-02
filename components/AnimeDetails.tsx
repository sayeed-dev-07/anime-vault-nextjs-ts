'use client'
import { AnimeProp } from "@/app/page";
import { getFullLink } from "@/app/providers";
import { div } from "motion/react-client";
import Image from "next/image";


interface genres {
    name: string
}
interface video {
    player_url: string
}
interface screenshots {
    original: string
}
export interface AnimeObjProp extends AnimeProp {
    url: string,
    episodes: number,
    japanese: string[],
    fandubbers: string[],
    fansubbers: string[],
    genres: genres[],
    videos: video[],
    screenshots: screenshots[]

}
export interface AnimeObjPropContainer {
    prop: AnimeObjProp
}
const AnimeDetails = ({ prop }: AnimeObjPropContainer) => {
    const videoUrl = prop.videos[0].player_url
    return (
        <div className="pb-[5%]">
            <div className="flex md:flex-row flex-col md:items-start gap-x-6 items-center gap-y-5">
                <div className="relative w-full sm:w-[400px] h-64 sm:h-120">
                    <Image alt={prop.name} fill src={getFullLink(prop.image.original)} />
                </div>
                <div className="flex flex-col  gap-y-4">

                    <p className="font-semibold text-2xl">📝Name : <span className="font-normal">{prop.name}</span></p>
                    <p className="font-semibold text-lg">🎌 JP : <span className="font-normal">{prop.japanese.join(',')}</span></p>
                    <p className="font-semibold text-xl">🏷️Tags : <span className="font-normal">
                        {
                            prop.genres.length === 0 ? '' : prop.genres.map(gen => ` ${gen.name} `).join(' | ')
                        }
                    </span></p>

                    <p className="font-semibold text-xl ">🎭Type : <span className="font-normal uppercase">{prop.kind}</span></p>
                    <p className="font-semibold text-xl ">⭐Rating : <span className="font-normal uppercase">{prop.score}</span></p>
                    <p className="font-semibold text-xl ">🎬Episodes : <span className="font-normal ">{prop.episodes}</span></p>
                    <p className="font-semibold text-xl ">🔗Link : <a target="_blank" className="underline" href={`${getFullLink(prop.url)}`}>{prop.name}</a></p>
                    <p className="font-semibold text-xl ">💬Fansubbers : <span className="font-normal ">{prop.fansubbers.length === 0 ? '...' : `${prop.fansubbers.join(' | ')}`}</span></p>
                    <p className="font-semibold text-xl ">🎤Fandubbers : <span className="font-normal ">{prop.fandubbers.length === 0 ? '...' : `${prop.fandubbers.join(' | ')}`}</span></p>
                </div>
            </div>
            <div className="mt-6 mb-3">
                <p className="text-3xl font-semibold">🖼️Screenshots: </p>
                <div className="flex items-center sm:justify-start justify-center gap-3 flex-wrap mt-5">
                    {
                        prop.screenshots.map((item, index) => (
                            <div className="relative h-56 w-[400px]" key={index}>
                                <Image fill alt={prop.name} src={getFullLink(item.original)} />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="mt-6 mb-3">
                <p className="text-3xl font-semibold">▶️Video : </p>
                <div className="mt-5">
                    {
                        videoUrl ? <div className="h-[40vh]">
                            <iframe
                                className="sm:w-[600] sm:h-[400px] w-[95vw] h-[300px]"
                                src={`${videoUrl}?autoplay=1&mute=1`}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                frameBorder="0"
                            />

                        </div> : 'Video not found!'
                    }

                </div>
            </div>
        </div>
    );
};

export default AnimeDetails;