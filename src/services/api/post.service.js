import axios from "@services/axios"

export async function createPostNoImage(body) {
    const res = await axios.post("/posts/create", body)
    return res;
}

export async function createPostWithImage(body) {
    const res = await axios.post("/posts/create_with_image", body)
    return res;
}