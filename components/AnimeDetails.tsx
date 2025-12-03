'use client'
import { AnimeProp } from "@/app/page";
import { getFullLink } from "@/app/providers";

import Image from "next/image";
import BackButton from "./BackButton";


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
    const videoUrl = prop.videos?.[0]?.player_url ?? null;
const videoUrl2 = prop.videos?.[1]?.player_url ?? null;

    return (
        <div className="pb-[5%] relative text-[#001219]">
            <div className="fixed right-[5%] bottom-[5%] z-100">
                <BackButton />
            </div>
            <div className="mt-2 flex md:flex-row flex-col items-start gap-x-6 gap-y-5">
                <div className="relative w-full max-w-[300px] aspect-2/3 mx-auto sm:mx-0">
                    <Image
                        src={getFullLink(prop.image.original)}
                        alt={prop.name}
                        fill
                        className="object-cover rounded-md"
                    />
                </div>



                <div className="flex flex-col  gap-y-4">

                    <p className="font-semibold text-2xl">📝Name : <span className="font-normal">{prop.name}</span></p>
                    <p className="font-semibold text-lg">🎌 JP : <span className="font-normal">{prop.japanese.join(',')}</span></p>
                    <p className="font-semibold text-xl">🏷️Tags : <span className="font-normal">
                        {
                            prop.genres.length === 0 ? 'no tag found' : prop.genres.map(gen => ` ${gen.name} `).join(' | ')
                        }
                    </span></p>

                    <p className="font-semibold text-xl ">🎭Type : <span className="font-normal uppercase">{prop.kind}</span></p>
                    <p className="font-semibold text-xl ">⭐Rating : <span className="font-normal uppercase">{prop.score}</span></p>
                    <p className="font-semibold text-xl ">🎬Episodes : <span className="font-normal ">{prop.episodes}</span></p>
                    <p className="font-semibold text-xl ">🔗Link : <a target="_blank" className="underline" href={`${getFullLink(prop.url)}`}>{prop.name}</a></p>
                    <p className="font-semibold text-xl ">💬Fansubbers : <span className="font-normal ">{prop.fansubbers.length === 0 ? 'not found any' : `${prop.fansubbers.join(' | ')}`}</span></p>
                    <p className="font-semibold text-xl ">🎤Fandubbers : <span className="font-normal ">{prop.fandubbers.length === 0 ? 'not found any' : `${prop.fandubbers.join(' | ')}`}</span></p>
                </div>
            </div>
            <div className="mt-6 mb-3">
                <p className="text-3xl font-semibold">🖼️Screenshots: </p>
                <div className="flex flex-col md:flex-row gap-4 w-full mt-5">
                    {prop.screenshots.length === 0 ? (
                        <p>Screenshot not found</p>
                    ) : (
                        prop.screenshots.map((item, index) => (
                            <div className="relative flex-1 aspect-video" key={index}>
                                <Image
                                    fill
                                    alt={prop.name}
                                    src={getFullLink(item.original)}
                                    className="object-cover rounded-md"
                                />
                            </div>
                        ))
                    )}
                </div>

            </div>
            <div className="mt-6 mb-3">
                <p className="text-3xl font-semibold">▶️Videos : </p>
                <div className="mt-5 flex flex-col md:flex-row gap-4 w-full">
                    {videoUrl ? (
                        <div className="flex-1 aspect-video md:max-w-[50%]">
                            <iframe
                                className="w-full h-full rounded-md"
                                src={`${videoUrl}?autoplay=1&mute=1`}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <div className="flex-1 aspect-video flex items-center justify-center text-3xl font-semibold">
                            <p>Video not found!</p>
                        </div>
                    )}

                    {videoUrl2 ? (
                        <div className="flex-1 aspect-video">
                            <iframe
                                className="w-full h-full rounded-md"
                                src={`${videoUrl2}?autoplay=1&mute=1`}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <div className="flex-1 aspect-video flex items-center justify-center text-3xl font-semibold">
                            <p>Video not found!</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AnimeDetails;