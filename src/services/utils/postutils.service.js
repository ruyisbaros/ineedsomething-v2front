

export function selectPostBackground(bgColor, postData, setTextAreaBackground, setPostData, setDisable) {
    postData.bgColor = bgColor
    setTextAreaBackground(bgColor)
    setPostData(postData)
    setDisable(false)
}

export function handlePostText(text, postData, setPostData, setDisable) {
    postData.post = text
    setPostData(postData)
    setDisable(false)
}