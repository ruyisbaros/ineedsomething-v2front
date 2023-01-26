import { useRoutes } from "react-router-dom"
import Chat from "@pages/social/chat/Chat"
import Following from "@pages/social/following/Following"
import People from "@pages/social/people/People"
import { Auth, ForgotPassword, ResetPassword, Streams, Social } from "./pages"
import Followers from './pages/social/followers/Followers';
import Photos from "@pages/social/photos/Photos"
import Notifications from "@pages/social/notifications/Notifications"
import Profile from "@pages/social/profile/Profile"
import ProtectedRoutes from "@pages/ProtectedRoutes"
import Error from "@pages/error/Error"
import { Suspense } from "react"
import StreamsSkeleton from "@pages/social/streams/StreamsSkeleton"

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
            path: "/app/social",
            element: (
                <ProtectedRoutes>
                    <Social />
                </ProtectedRoutes>
            ),
            children: [
                {
                    path: "streams",
                    element: (
                        <Suspense fallback={<StreamsSkeleton />}>
                            <Streams />
                        </Suspense>
                    )
                },
                {
                    path: "chat/messages",
                    element: <Chat />
                },
                {
                    path: "people",
                    element: <People />
                },
                {
                    path: "following",
                    element: <Following />
                },
                {
                    path: "followers",
                    element: <Followers />
                },
                {
                    path: "photos",
                    element: <Photos />
                },
                {
                    path: "notifications",
                    element: <Notifications />
                },
                {
                    path: "profile/:username",
                    element: <Profile />
                },
            ]
        },
        {
            path: "*",
            element: <Error />
        }
    ])
}