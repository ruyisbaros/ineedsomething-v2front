import { avatarColors } from "./static.data"
import { floor, random } from "lodash"

export function createAvatarColor() {
    return avatarColors[floor(random(0.9) * avatarColors.length)]
}

export function generateAvatar(text, bcgColor, fgColor = "white") {

    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")

    /* canvas.width = 200;
    canvas.height = 200; */

    context.fillStyle = bcgColor
    context.fillRect(0, 0, 200, 200)
    context.font = "normal 80px sans-serif"
    context.fillStyle = fgColor
    context.textAlign = "center"
    context.textBaseline = "middle"
    context.fillText(text, 100, 100)

    return canvas.toDataURL("image/png")
}