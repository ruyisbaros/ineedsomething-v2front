
import { configureStore } from "@reduxjs/toolkit";
import currentUserSlicer from "./currentUserSlicer";
import suggestionsSlice from "./suggestionsSlicer";
import usersSlicer from "./usersSlicer";

export const store = configureStore({
    reducer: {
        currentUser: currentUserSlicer,
        users: usersSlicer,
        suggestions: suggestionsSlice
    },
});
