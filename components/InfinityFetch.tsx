'use server'
export async function fetchInf(page: number, name: string, top: boolean, gener:boolean, genID: number) {
    if (gener) {
        const res = await fetch(`https://api.jikan.moe/v4/${name === 'animeData'? 'anime': 'manga'}?genres=${genID}&page=${page}&limit=12`)
        return res.json()
    }
    if (name === 'animeData') {
        const res = await fetch(`https://api.jikan.moe/v4/${top ? 'top/': ''}anime?page=${page}&limit=12`)
        return res.json()
    }else{
        const res = await fetch(`https://api.jikan.moe/v4/${top ? 'top/': ''}manga?page=${page}&limit=12`)
    return res.json()
    }

}


