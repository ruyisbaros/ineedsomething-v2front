import axios from "axios"
const GIPHY_URL = "https://api.giphy.com/v1/gifs"
const API_KEY = process.env.REACT_APP_GIPHY_KEY

export async function searchGiphy(query) {
    const res = await axios.get(`${GIPHY_URL}/search`, { params: { api_key: API_KEY, q: query } })

    return res;
}
export async function trendingGiphy() {
    const res = await axios.get(`${GIPHY_URL}/trending`, { params: { api_key: API_KEY } })

    return res;
}

export async function getTrendingGifs(setGifs, setLoading) {
    setLoading(true);
    try {
        const response = await trendingGiphy();
        setGifs(response.data.data);
        setLoading(false);
    } catch (error) {
        setLoading(false);
    }
}

export async function searchGifs(gif, setGifs, setLoading) {
    if (gif.length <= 1) {
        getTrendingGifs(setGifs, setLoading);
        return;
    }
    setLoading(true);
    try {
        const response = await searchGiphy(gif);
        setGifs(response.data.data);
        setLoading(false);
    } catch (error) {
        setLoading(false);
    }
}