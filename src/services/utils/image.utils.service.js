

export function validateImageFile(file) {

    const validType = ["image/png", "image/jpg", "image/jpeg", "image/gif"]

    if (!file) {
        return window.alert(`Please select a file`)
    }
    if (!validType.includes(file.type)) {
        return window.alert(`File ${file.name} is not excepted`)
    }
    if (file.size > 50000000) {
        return window.alert(`File is too large`)
    }
}

export async function readImageAsBase64(file) {
    const reader = new FileReader();
    const fileValue = new Promise((resolve, reject) => {
        reader.addEventListener('load', () => {
            resolve(reader.result);
        });

        reader.addEventListener('error', (event) => {
            reject(event);
        });

        reader.readAsDataURL(file);
    });
    return fileValue;
}

//Get image background color
export async function getImageBackgroundColor(imgUrl) {
    const image = new Image()
    image.crossOrigin = "Anonymous"

    const imageBackgroundColor = new Promise((resolve, reject) => {
        image.addEventListener('load', () => {
            const canvas = document.createElement("canvas")
            const context = canvas.getContext("2d")
            canvas.width = image.width
            canvas.height = image.height
            context.drawImage(image, 0, 0)

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
            const params = imageData.data
            const bgColor = convertRGBToHex(params[0], params[1], params[2])
            resolve(bgColor);
        });

        image.addEventListener('error', (event) => {
            reject(event);
        });

        image.src = imgUrl
    });
    return imageBackgroundColor
}

function convertRGBToHex(red, green, blue) {
    red = red.toString(16)
    green = green.toString(16)
    blue = blue.toString(16)

    red = red.length === 1 ? "0" + red : red
    green = green.length === 1 ? "0" + green : green
    blue = blue.length === 1 ? "0" + blue : blue

    return `#${red}${green}${blue}`
}



