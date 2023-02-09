import axios from "@services/axios"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

export async function getAllPosts(page) {
    const res = await axios.get(`/posts/get_all/${page}`)
    return res
}

export async function getAllPostsWithImages(page) {
    const res = await axios.get(`/posts/get_all_with_image/${page}`)
    return res
}

export async function createPostNoImage(body) {
    const res = await axios.post("/posts/create", body)
    return res;
}

export async function createPostWithImage(body) {
    const res = await axios.post("/posts/create_with_image", body)
    return res;
}

