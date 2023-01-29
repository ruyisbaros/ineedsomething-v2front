import { createAsyncThunk } from "@reduxjs/toolkit";
import { userSuggestions } from "./user.service";
import { toast } from 'react-toastify';

const getUserSuggestions = createAsyncThunk("user/getSuggestions", async (name, { dispatch }) => {
    try {
        const res = await userSuggestions()
        //console.log(res.data)
        return res.data
    } catch (error) {
        toast.error(error.response.data.message)

    }
})

export { getUserSuggestions }