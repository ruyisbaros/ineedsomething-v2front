import { avatarColors } from "./static.data"
import { floor, random, some } from "lodash"
import { authLogout, userLoggedSuccess } from "@redux/currentUserSlicer"
import { addNotification, clearNotification } from "@redux/notificationSlicer"

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
    //console.log(res.data);
    dispatch(userLoggedSuccess({ currentUser: res?.data.user, token: res?.data.token }))
    setCurrentUser(res?.data?.user)
}

export function clearCurrentUser({ dispatch, deleteStoreUsername, deleteStoragePageReload, setLoggedMeIn }) {
    dispatch(authLogout());
    dispatch(clearNotification())
    deleteStoreUsername()
    deleteStoragePageReload()
    setLoggedMeIn(false)
}

export function dispatchNotifications(message, type, dispatch) {
    dispatch(addNotification({ message, type }))
}

export function dispatchClearNotifications(dispatch) {
    dispatch(clearNotification())
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

export function appImageUrl(version, id) {
    if (typeof version === 'string' && typeof id === 'string') {
        version = version.replace(/['"]+/g, '');
        id = id.replace(/['"]+/g, '');
    }
    return `https://res.cloudinary.com/ruyisbaros/image/upload/v${version}/${id}`;
}

export function checkIfUserIsLocked(blocked, userId) {

    return some(blocked, (id) => id === userId)
}

export function checkIfUserIsFollowed(userFollowers, postCreatorId, userId) {

    return some(userFollowers, (user) => user._id === postCreatorId || postCreatorId === userId)
}