export const fetchData = async (baseURL: string) => {
    const res = await fetch(baseURL)
    const resData = await res.json();
    const mainArr = resData.data
    return mainArr;
}

type nameProp = 'anime' | 'manga'
export type typeProp = 'characters' | 'recommendations' | 'staff'

export async function getRecAndCharData(name: nameProp, id: number, type: typeProp) {

    const charRes = await fetch(`https://api.jikan.moe/v4/${name}/${id}/${type}`, {
        next: { revalidate: 1000 * 60 * 2 }})
    const charData = await charRes.json()
    return charData.data ? charData.data : [];
}