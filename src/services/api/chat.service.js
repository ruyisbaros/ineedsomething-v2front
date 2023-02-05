import axios from "@services/axios"
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

//Last messages?
export async function getChatList() {
    return await axios.get("/chat/last_messages")
}

export async function removeChatUsers(body) {
    return await axios.post("/chat/remove_users", body)
}

export async function addChatUsers(body) {
    return await axios.post("/chat/add_users", body)
}

export async function markMessagesAsRead(senderId, receiverId) {
    return await axios.put("/chat/mark_read", { senderId, receiverId })
}


export const getConversationList = createAsyncThunk("conversation/getConversations", async (name, { dispatch }) => {
    try {
        const res = await getChatList()
        return res.data
    } catch (error) {
        toast.error(error.response.data.message)
    }
})