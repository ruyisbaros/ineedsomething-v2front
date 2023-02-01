
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: '',
    post: '',
    bgColor: '',
    privacy: '',
    feelings: '',
    gifUrl: '',
    profilePicture: '',
    image: '',
    userId: '',
    username: '',
    email: '',
    avatarColor: '',
    commentsCount: '',
    reactions: [],
    imgVersion: '',
    imgId: '',
    createdAt: ''
};

const postSlicer = createSlice({
    name: "post",
    initialState,
    reducers: {
        updatePostItem: (state, action) => {
            for (const [key, value] of Object.entries(action.payload)) {
                state[key] = value
            }
        },
        clearPost: (state) => {
            state._id = ''
            state.post = ''
            state.bgColor = ''
            state.privacy = ''
            state.feelings = ''
            state.gifUrl = ''
            state.profilePicture = ''
            state.image = ''
            state.userId = ''
            state.username = ''
            state.email = ''
            state.avatarColor = ''
            state.commentsCount = ''
            state.reactions = []
            state.imgVersion = ''
            state.imgId = ''
            state.createdAt = ''
        }
    },
});

export const {
    updatePostItem,
    clearPost
} = postSlicer.actions;

export default postSlicer.reducer;
