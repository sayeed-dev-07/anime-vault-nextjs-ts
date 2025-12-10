'use server'
export async function fetchInf(page: number, name: string) {
    if (name === 'animeData') {
        const res = await fetch(`https://api.jikan.moe/v4/anime?page=${page}&limit=12`)
        return res.json()
    }else{
        const res = await fetch(`https://api.jikan.moe/v4/manga?page=${page}&limit=12`)
    return res.json()
    }

}


