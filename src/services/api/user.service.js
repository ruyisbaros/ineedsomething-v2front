import axios from "@services/axios"

class UserService {
    async getUserSuggestions() {
        const res = await axios.get("/user/follow_offers")
        return res;
    }
}

export const userService = new UserService()