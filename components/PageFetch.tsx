import { randomIdntProp } from "./SearchFetch"


export async function PageFetch(page: number, name: randomIdntProp, search: string) {
    const res = await fetch(`https://api.jikan.moe/v4/${name === 'search-anime' ? 'anime' : 'manga'}?q=${search}&page=${page}&limit=8`)
    return res.json()
}