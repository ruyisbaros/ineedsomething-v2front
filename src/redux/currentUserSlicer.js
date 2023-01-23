
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    token: "",
};

const currentUserSlicer = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        userLoggedSuccess: (state, action) => {
            state.currentUser = action.payload.currentUser;
            state.token = action.payload.token;
        },
        updateCurrentUser: (state, action) => {
            state.currentUser = action.payload.currentUser;
        },
        refreshToken: (state, action) => {
            state.token = action.payload.token;
            state.currentUser = action.payload.currentUser;
        },
        authLogout: (state) => {
            state.currentUser = null;
            state.token = "";
        },
    },
});

export const {
    userLoggedSuccess,
    refreshToken,
    authLogout,
    updateCurrentUser
} = currentUserSlicer.actions;

export default currentUserSlicer.reducer;
