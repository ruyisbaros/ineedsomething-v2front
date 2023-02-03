import { createSlice } from "@reduxjs/toolkit";
import { getConversationList } from "@services/api/chat.service";


const initialState = {
    chatList: [],
    selectedChatUser: null,
    isLoading: false
};

const chatSlicer = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addToChatList: (state, action) => {
            const { isLoading, chatList } = action.payload
            state.isLoading = isLoading
            state.chatList = [...chatList]
        },
        setSelectedChatUser: (state, action) => {
            const { isLoading, user } = action.payload
            state.isLoading = isLoading
            state.selectedChatUser = user
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getConversationList.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getConversationList.fulfilled, (state, action) => {
            const { list } = action.payload
            state.isLoading = false
            state.chatList = [...list]

        })
        builder.addCase(getConversationList.rejected, (state) => {
            state.isLoading = false
        })
    }
});

export const {
    addToChatList,
    setSelectedChatUser
} = chatSlicer.actions;

export default chatSlicer.reducer;
