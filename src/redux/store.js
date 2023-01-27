
import { configureStore } from "@reduxjs/toolkit";
import currentUserSlicer from "./currentUserSlicer";
import notificationSlicer from "./notificationSlicer";
import postModalSlicer from "./postModalSlicer";
import suggestionsSlice from "./suggestionsSlicer";
import usersSlicer from "./usersSlicer";

export const store = configureStore({
    reducer: {
        currentUser: currentUserSlicer,
        users: usersSlicer,
        suggestions: suggestionsSlice,
        notifications: notificationSlicer,
        modal: postModalSlicer
    },
});
