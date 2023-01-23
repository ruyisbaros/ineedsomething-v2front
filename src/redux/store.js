
import { configureStore } from "@reduxjs/toolkit";
import currentUserSlicer from "./currentUserSlicer";

export const store = configureStore({
    reducer: {
        currentUser: currentUserSlicer
    },
});
