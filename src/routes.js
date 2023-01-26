import ProtectedRoutes from "@pages/ProtectedRoutes"
import Error from "@pages/error/Error"
import StreamsSkeleton from "@pages/social/streams/StreamsSkeleton"
import { useRoutes } from "react-router-dom"
import { Suspense, lazy } from "react"
import Auth from "@pages/auth/Auth";
import ForgotPassword from "@pages/auth/ForgotPassword";
import ResetPassword from "@pages/auth/ResetPassword";

const Social = lazy(() => import("@pages/social/Social"))
const Chat = lazy(() => import("@pages/social/chat/Chat"))
const Followers = lazy(() => import("@pages/social/followers/Followers"))
const Following = lazy(() => import("@pages/social/following/Following"))
const People = lazy(() => import("@pages/social/people/People"))
const Photos = lazy(() => import("@pages/social/photos/Photos"))
const Notifications = lazy(() => import("@pages/social/notifications/Notifications"))
const Profile = lazy(() => import("@pages/social/profile/Profile"))
const Streams = lazy(() => import("@pages/social/streams/Streams"))

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
                    element: (
                        <Suspense>
                            <Chat />
                        </Suspense>
                    )
                },
                {
                    path: "people",
                    element: (
                        <Suspense>
                            <People />
                        </Suspense>
                    )
                },
                {
                    path: "following",
                    element: (
                        <Suspense>
                            <Following />
                        </Suspense>
                    )
                },
                {
                    path: "followers",
                    element: (
                        <Suspense>
                            <Followers />
                        </Suspense>
                    )
                },
                {
                    path: "photos",
                    element: (
                        <Suspense>
                            <Photos />
                        </Suspense>
                    )
                },
                {
                    path: "notifications",
                    element: (
                        <Suspense>
                            <Notifications />
                        </Suspense>
                    )
                },
                {
                    path: "profile/:username",
                    element: (
                        <Suspense>
                            <Profile />
                        </Suspense>
                    )
                },
            ]
        },
        {
            path: "*",
            element: <Error />
        }
    ])
}