
import { createSlice } from "@reduxjs/toolkit";
import { getUserSuggestions } from '@services/api/suggestion';

const initialState = {
    suggestUsers: [],
    isLoading: false
};

const suggestionsSlice = createSlice({
    name: "suggestions",
    initialState,
    reducers: {
        fetchSuggestions: (state, action) => {
            state.isLoading = action.payload.isLoading
            state.suggestUsers = [...action.payload.users]
        },

    },
    extraReducers: (builder) => {
        builder.addCase(getUserSuggestions.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getUserSuggestions.fulfilled, (state, action) => {
            state.isLoading = false
            state.suggestUsers = [...action.payload.users]
        })
        builder.addCase(getUserSuggestions.rejected, (state) => {
            state.isLoading = false
        })
    }
});

export const {
    fetchSuggestions,
} = suggestionsSlice.actions;

export default suggestionsSlice.reducer;
