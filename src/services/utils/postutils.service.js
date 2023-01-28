import { createPostWithImage } from "@services/api/post.service"
import { toast } from "react-toastify"
import { closeModal } from '@redux/postModalSlicer';
import { clearPost } from '@redux/postSlicer';


export function selectPostBackground(bgColor, postData, setTextAreaBackground, setPostData, setDisable) {
    postData.bgColor = bgColor
    setTextAreaBackground(bgColor)
    setPostData(postData)
    setDisable(false)
}

export function closePostCreateModal(dispatch) {
    dispatch(closeModal());
    dispatch(clearPost());
}

export function handlePostText(text, postData, setPostData, setDisable) {
    postData.post = text
    setPostData(postData)
    setDisable(false)
}

export async function sendPostWithImage(fileResult, postData, inputImgRef, setApiResponse, setLoading, dispatch) {
    try {
        setLoading(true)
        postData.image = fileResult
        if (inputImgRef?.current) {
            inputImgRef.current.textContent = postData.post
        }
        const res = await createPostWithImage(postData)
        if (res) {
            setApiResponse("success")
            if (res) {
                toast.success("Post has been created successfully")
                closePostCreateModal(dispatch)
            }
        }
        setLoading(false)
    } catch (error) {
        setLoading(false)
        toast.error(error.response.data.message);
    }
}