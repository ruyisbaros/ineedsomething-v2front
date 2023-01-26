
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    isLoading: false
};

const usersSlicer = createSlice({
    name: "users",
    initialState,
    reducers: {
        fetchUsers: (state, action) => {
            state.users = [...action.payload.users]
            state.isLoading = action.payload.isLoading
        },

    },
});

export const {
    fetchUsers,

} = usersSlicer.actions;

export default usersSlicer.reducer;
