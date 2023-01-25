import { avatarColors } from "./static.data"
import { floor, random } from "lodash"
import { authLogout, userLoggedSuccess } from "@redux/currentUserSlicer"
import { currentUser } from "@services/api/user.service"

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

export async function dispatchCurrentUser(pageReload, dispatch, setCurrentUser) {
    pageReload(true);
    const res = await currentUser()
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

export function generateString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export function mapSettingsDropdownItems(setSettings) {
    const items = []

    const item = {
        topText: "My Profile",
        subText: "View Personal Profile"
    }

    items.push(item)
    setSettings(items)
    return items;
}