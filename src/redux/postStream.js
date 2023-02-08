
import { createSlice } from "@reduxjs/toolkit";
import { getPosts } from "@services/api/post.service";

const initialState = {
    posts: [],
    totalPostsCount: 0,
    isLoading: false,
};

const allPostsSlicer = createSlice({
    name: "allPosts",
    initialState,
    reducers: {
        addToPosts: (state, action) => {
            state.posts = [...action.payload]
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.isLoading = false
            state.posts = [...action?.payload?.posts]
            state.totalPostsCount = action.payload.totalPosts
        })
        builder.addCase(getPosts.rejected, (state) => {
            state.isLoading = false
        })
    }
});

export const {
    addToPosts
} = allPostsSlicer.actions;

export default allPostsSlicer.reducer;
