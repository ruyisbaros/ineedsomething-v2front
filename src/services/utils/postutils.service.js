

export function selectPostBackground(bgColor, postData, setTextAreaBackground, setPostData, setDisable) {
    postData.bgColor = bgColor
    setTextAreaBackground(bgColor)
    setPostData(postData)
    setDisable(false)
}