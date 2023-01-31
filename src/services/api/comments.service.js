import axios from "@services/axios"

export async function addComment(body) {
    const res = await axios.post("/post/comments/add", body)
    return res
}

export async function getCommentNames(postId) {
    return await axios.get(`/post/comments/comment_names/${postId}`)
}