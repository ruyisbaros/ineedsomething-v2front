import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "./user.service";

const getUserSuggestions = createAsyncThunk("user/getSuggestions", async (name, { dispatch }) => {
    try {
        const res = await userService.getUserSuggestions()
        //console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error);

    }
})

export { getUserSuggestions }