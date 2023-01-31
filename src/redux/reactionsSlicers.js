import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reactions: []
}


const reactionSlice = createSlice({
    name: "reactions",
    initialState,
    reducers: {
        addReaction: (state, action) => {
            state.reactions = action.payload
        },

    },
});

export const {
    addReaction,

} = reactionSlice.actions;

export default reactionSlice.reducer;
