import { avatarColors } from "./static.data"
import { floor, random } from "lodash"
import { authLogout, userLoggedSuccess } from "@redux/currentUserSlicer"

export function createAvatarColor() {
    return avatarColors[floor(random(0.9) * avatarColors.length)]
}

export function generateAvatar(text, bcgColor, fgColor = "white") {

    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")

    context.fillStyle = bcgColor
    context.fillRect(0, 0, 200, 200)
    context.font = "normal 80px sans-serif"
    context.fillStyle = fgColor
    context.textAlign = "center"
    context.textBaseline = "middle"
    context.fillText(text, 100, 100)

    return canvas.toDataURL("image/png")
}

export function dispatchCurrentUser(res, pageReload, dispatch, setCurrentUser) {
    pageReload(true);
    dispatch(userLoggedSuccess({ currentUser: res?.data.user, token: res?.data.token }))
    setCurrentUser(res?.data?.user)
}

export function clearCurrentUser({ dispatch, deleteStorageUsername, deleteStoragePageReload, setLoggedMeIn, setCurrentUser }) {
    dispatch(authLogout());
    //Clear later notifications
    deleteStorageUsername()
    deleteStoragePageReload()
    setLoggedMeIn(false)
    setCurrentUser(null)
}

export function appEnvironment() {
    const env = process.env.REACT_APP_ENVIRONMENT
    if (env === "development") {
        return "DEV"
    } else if (env === "staging") {
        return "STG"
    } else {
        return ""
    }
}