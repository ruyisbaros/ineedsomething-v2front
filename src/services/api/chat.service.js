import axios from "@services/axios"
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

//Last messages?
export async function getChatList() {
    return await axios.get("/chat/last_messages")
}



export const getConversationList = createAsyncThunk("conversation/getConversations", async (name, { dispatch }) => {
    try {
        const res = await getChatList()
        return res.data
    } catch (error) {
        toast.error(error.response.data.message)

    }
})