import { createPostWithImage } from "@services/api/post.service"
import { toast } from "react-toastify"
import { closeModal } from '@redux/postModalSlicer';
import { clearPost } from '@redux/postSlicer';
import { checkIfUserIsFollowed } from "./util.service";
import { cloneDeep, findIndex, remove, find } from 'lodash';
import { socketService } from "@services/sockets/socket.service";


export function selectPostBackground(bgColor, postData, setTextAreaBackground, setPostData) {
    postData.bgColor = bgColor
    setTextAreaBackground(bgColor)
    setPostData(postData)
}

export function closePostCreateModal(dispatch) {
    dispatch(closeModal());
    dispatch(clearPost());
}

export function handlePostText(text, postData, setPostData) {
    postData.post = text
    setPostData(postData)
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

export function checkPostPrivacy(post, profile, following) {
    const isPrivate = post.privacy === "Private" && post.userId === profile?._id
    const isPublic = post.privacy === "Public"
    const isFollower = post.privacy === "Followers" && checkIfUserIsFollowed(following, post?.userId, profile?._id)

    return isPrivate || isPublic || isFollower
}

export function positionCursor(elementId) {
    const element = document.getElementById(`${elementId}`)
    const selection = window.getSelection()
    const range = document.createRange()
    selection.removeAllRanges()
    range.selectNodeContents(element)
    range.collapse(false)
    selection.addRange(range)
    element.focus()
}

export function socketIOPost(posts, setPosts) {
    posts = cloneDeep(posts)
    socketService?.socket?.on("add post", (createdPost) => {
        posts = [createdPost, ...posts]
        setPosts(posts)
    })

    socketService?.socket?.on("update post", (updatedPost) => {
        updatePost(posts, updatedPost, setPosts)
    })

    socketService?.socket?.on("delete post", (postId) => {
        deletePost(posts, postId, setPosts)
    })

    socketService?.socket?.on("update like", (reaction) => {
        const postData = find(posts, (data) => data._id === reaction.postId)
        if (postData) {
            postData.reactions = reaction.postReactions
            updatePost(posts, postData, setPosts)
        }
    })

    socketService?.socket?.on("update comment", (comment) => {
        const postData = find(posts, (data) => data._id === comment.postId)
        if (postData) {
            postData.commentsCount = comment.commentsCount
            updatePost(posts, postData, setPosts)
        }
    })
}

export function updatePost(posts, post, setPosts) {
    posts = cloneDeep(posts)
    const index = findIndex(posts, (data) => data._id === post._id)
    if (index > -1) {
        posts.splice(index, 1, post)
        setPosts(posts)
    }
}

export function deletePost(posts, id, setPosts) {
    posts = cloneDeep(posts)
    const index = findIndex(posts, (data) => data._id === id)
    if (index > -1) {
        remove(posts, { _id: id })
        setPosts(posts)
    }
}