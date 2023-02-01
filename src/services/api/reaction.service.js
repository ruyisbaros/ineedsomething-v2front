import axios from "@services/axios"

export async function addUserReaction(body) {
    const res = await axios.post("/post/reactions/add", { ...body })
    return res;
}

export async function getReactionsByUsername(username) {
    const res = await axios.get(`/post/reactions/pr_user_all/${username}`)
    return res;
}

export async function getUserSingleReactionOfPost(username, postId) {
    const res = await axios.get(`/post/reactions/pr_user/${username}/${postId}`)
    return res;
}

export async function getSinglePostReactions(postId) {
    const res = await axios.get(`/post/reactions/post_reactions/${postId}`)
    return res;
}

export async function removeReactionFromDb(postId, previousReaction, postReactions) {
    const res = await axios.delete(`/post/reactions/delete/${postId}/${previousReaction}/${postReactions}`)
    return res;
}

