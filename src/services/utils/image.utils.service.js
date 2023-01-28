

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

export function readImageAsBase64(file) {
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



