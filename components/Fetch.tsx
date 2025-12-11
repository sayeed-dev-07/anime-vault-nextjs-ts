export const fetchData = async (baseURL: string) => {
    const res = await fetch(baseURL)
    const resData = await res.json();
    const mainArr = resData.data
    return mainArr;
}

type nameProp = 'anime' | 'manga'
type typeProp = 'characters' | 'recommendations'

export async function getRecAndCharData(name: nameProp, id: number, type: typeProp) {

    const charRes = await fetch(`https://api.jikan.moe/v4/${name}/${id}/${type}`)
    const charData = await charRes.json()

    if (type === 'characters') {
        return charData.data.slice(0,12);
    } else {
        return charData.data.slice(0, 8);
    }
}