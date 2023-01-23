import { useRoutes } from "react-router-dom"
import { Auth, ForgotPassword, ResetPassword, Streams } from "./pages"

export const Routers = () => {

    return useRoutes([
        {
            path: "/",
            element: <Auth />
        },
        {
            path: "/forgot_pwd",
            element: <ForgotPassword />
        },
        {
            path: "/reset-password",
            element: <ResetPassword />
        },
        {
            path: "/app/social/streams",
            element: <Streams />
        },
    ])
}