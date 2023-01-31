import React, { useState, useRef, useEffect } from 'react'
import { Input } from '@components/index';
import { useSelector } from 'react-redux';
import "./commentInputBox.scss"
import { addComment } from '@services/api/comments.service';
import { toast } from 'react-toastify';
import { cloneDeep } from 'lodash';
import { socketService } from '@services/sockets/socket.service';

const CommentInputBox = ({ post }) => {
    const { currentUser } = useSelector(store => store.currentUser)
    const [comment, setComment] = useState("")
    const commentInputRef = useRef(null)

    const submitComment = async (e) => {
        e.preventDefault()
        try {
            post = cloneDeep(post)
            post.commentsCount += 1
            const commentBody = {
                userTo: post?.userId,
                postId: post?._id,
                profilePicture: currentUser?.profilePicture,
                comment: comment.trim(),
                commentsCount: post?.commentsCount
            }
            socketService?.socket?.emit("comment", commentBody)
            const res = await addComment(commentBody)
            setComment("")

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        if (commentInputRef.current) {
            commentInputRef.current.focus()
        }
    }, [])

    return (
        <div className='comment-container'>
            <form className="comment-form" onSubmit={submitComment}>
                <Input
                    ref={commentInputRef}
                    name="comment"
                    type="text"
                    value={comment}
                    labelText=""
                    className="comment-input"
                    placeHolder="Type your comment..."
                    handleChange={(e) => setComment(e.target.value)}
                />
            </form>
        </div>
    )
}

export default CommentInputBox