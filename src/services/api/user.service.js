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
export async function getUserByUsername(userId, username, uId) {
    const res = await axios.get(`/user/profile_posts/${userId}/${username}/${uId}`)
    return res;
}

export async function updateUsersBasicInfo(body) {
    return await axios.put("/user/update_user_info", body)
}

export async function updateUsersSocialLinks(body) {
    return await axios.put("/user/update_socials", body)
}

export async function updateUsersNotificationSettings(body) {
    return await axios.put("/user/update_nots_receive", body)
}

export async function changePassword(body) {
    return await axios.put("/user/update_password", body)
}


export async function searchChatUsers(query) {
    return await axios.get(`/user/search_users/${query}`)
}
export async function currentUserCheck() {
    const res = await axios.get("/user/is_online")
    return res;
}

export function navigateOnProfiles(data, navigate) {
    const url = `/app/social/profile/${data?.username}?${createSearchParams({ uId: data?.uId, id: data?._id })}`
    navigate(url)
}


