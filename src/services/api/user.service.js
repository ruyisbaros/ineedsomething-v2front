import axios from "@services/axios"
import { createSearchParams } from "react-router-dom";


export async function userSuggestions() {
        const res = await axios.get("/user/follow_offers")
        return res;
}
export async function getAllUsers(page) {
    const res = await axios.get(`/user/get_all/${page}`)
    return res;
}
export async function currentUserCheck() {
    const res = await axios.get("/user/is_online")
    return res;
}

export function navigateOnProfiles(data, navigate) {
    const url = `/app/social/profile/${data?.username}?${createSearchParams({ uId: data?.uId, id: data?._id })}`
    navigate(url)
}


