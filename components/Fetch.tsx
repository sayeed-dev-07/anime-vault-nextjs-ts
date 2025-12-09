export const fetchData = async (baseURL: string) => {
    const res = await fetch(baseURL)
    const resData = await res.json();
    const mainArr = resData.data
    return mainArr;
}