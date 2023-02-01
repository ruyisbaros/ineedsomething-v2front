import React, { useState, useEffect } from 'react'
import ReactionWrapper from './../reaction-wrapper/ReactionWrapper';
import Avatar from '@components/avatar/Avatar';
import { toast } from 'react-toastify';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCommentsOfPost } from '@services/api/comments.service';
import { closeModal } from '@redux/postModalSlicer';
import { clearPost } from '@redux/postSlicer';
import "./commentsModal.scss"

const CommentsModal = () => {
    const { post } = useSelector(store => store)
    const [postComments, setPostComments] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const getPostComments = async () => {
            try {
                const res = await getCommentsOfPost(post._id)
                setPostComments(res.data.comments)
            } catch (error) {
                toast.error(error?.response?.data?.message)
            }
        }
        getPostComments()
    }, [post])

    const closeReactionsModal = () => {
        dispatch(closeModal())
        dispatch(clearPost())
    }

    return (
        <ReactionWrapper closeModal={closeReactionsModal}>
            <div className="modal-comments-header">
                <h2>Comments</h2>
            </div>
            <div className="modal-comments-container">
                <ul className="modal-comments-container-list">
                    {postComments.map((data) => (
                        <li className="modal-comments-container-list-item" key={data?._id} >
                            <div className="modal-comments-container-list-item-display">
                                <div className="user-img">
                                    <Avatar name={data?.username} bgColor={data?.avatarColor} textColor="#ffffff" size={45}
                                        avatarSrc={data?.profilePicture} />
                                </div>
                                <div className="modal-comments-container-list-item-display-block">
                                    <div className="comment-data">
                                        <h1>{data?.username}</h1>
                                        <p>{data?.comment}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </ReactionWrapper>
    )
}

export default CommentsModal