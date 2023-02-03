
import { configureStore } from "@reduxjs/toolkit";
import chatSlicer from "./chatSlicer";
import currentUserSlicer from "./currentUserSlicer";
import notificationSlicer from "./notificationSlicer";
import postModalSlicer from "./postModalSlicer";
import postSlicer from "./postSlicer";
import postStream from "./postStream";
import reactionsSlicers from "./reactionsSlicers";
import suggestionsSlice from "./suggestionsSlicer";
import usersSlicer from "./usersSlicer";

export const store = configureStore({
    reducer: {
        currentUser: currentUserSlicer,
        users: usersSlicer,
        suggestions: suggestionsSlice,
        notifications: notificationSlicer,
        modal: postModalSlicer,
        post: postSlicer,
        allPosts: postStream,
        reactions: reactionsSlicers,
        chat: chatSlicer
    },
});
