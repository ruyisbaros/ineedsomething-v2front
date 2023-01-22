import axios from "axios"

class AuthService {
    async register(body) {
        const res = await axios.post("/api/v1/auth/register", body)
        return res;
    }

    async login(body) {
        const res = await axios.post("/api/v1/auth/login", body)
        return res;
    }

    async forgotPassword(email) {
        const res = await axios.post("/api/v1/auth/forgot_password", { email })
        return res;
    }

    async resetPassword(password, token) {
        const res = await axios.post(`/api/v1/auth/reset_password/${token}`, { password })
        return res;
    }


    async logout() {
        const res = await axios.get("/api/v1/auth/logout")
        return res;
    }
}

export const authService = new AuthService()