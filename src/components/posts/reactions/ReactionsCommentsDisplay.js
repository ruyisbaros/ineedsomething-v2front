import React, { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { getSinglePostReactions } from '@services/api/reaction.service'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { formattedReactions, shortenLongNumbers, generateString } from '@services/utils/util.service';
import { reactionsMap } from '@services/utils/static.data';
import { updatePostItem } from '@redux/postSlicer';
import { toggleCommentsModal, toggleReactionsModal } from '@redux/postModalSlicer';
import { getCommentNames } from '@services/api/comments.service';
import "./reactionsCommentsDisplay.scss"

const ReactionsCommentsDisplay = ({ post }) => {
    const { reactionModalIsOpen, commentsModalIsOpen } = useSelector(store => store.modal)
    const [postReactions, setPostReactions] = useState([])
    const [reactions, setReactions] = useState([])
    const [commentNames, setCommentNames] = useState([])
    const dispatch = useDispatch()

    const getPostReactions = async () => {
        try {
            const res = await getSinglePostReactions(post._id)
            if (res) {
                setPostReactions(res.data.reactions)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    const getPostCommentNames = async () => {
        try {
            const res = await getCommentNames(post._id)
            console.log(res.data);
            setCommentNames([...new Set(res.data.commentNames
                .names)])
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    const sumAllReactions = (reactions) => {
        if (reactions.length) {
            const result = reactions.map((item) => item.value).reduce((prev, next) => prev + next)
            return shortenLongNumbers(result)
        }
    }

    const openReactionsComponent = () => {
        dispatch(updatePostItem(post))
        dispatch(toggleReactionsModal(!reactionModalIsOpen))
    }

    const openCommentsComponent = () => {
        dispatch(updatePostItem(post))
        dispatch(toggleCommentsModal(!commentsModalIsOpen))
    }

    useEffect(() => {
        setReactions(formattedReactions(post?.reactions))
    }, [post])

    return (
        <div className="reactions-display">
            <div className="reaction">
                <div className="likes-block">
                    <div className="likes-block-icons reactions-icon-display">
                        {reactions.length > 0 &&
                            reactions.slice(0, 10).map(reaction => (
                                <div key={generateString(10)} className="tooltip-container">
                                    <img
                                        className="reaction-img"
                                        src={reactionsMap[reaction.type]} alt=""
                                        onMouseEnter={getPostReactions}
                                    />
                                    <div className="tooltip-container-text tooltip-container-bottom">
                                        <p className="title">
                                            <img className="title-img" src={reactionsMap[reaction.type]} alt="" />
                                            {reaction.type.toUpperCase()}
                                        </p>
                                        <div className="likes-block-icons-list">
                                            {postReactions.length === 0 && <FaSpinner className="circle-notch" />}
                                            {postReactions.length > 0 &&
                                                <>
                                                    {postReactions.map(postReaction => (
                                                        <div key={postReaction._id}>
                                                            {reaction.type === postReaction.type && <span>{postReaction.username}</span>
                                                            }
                                                        </div>
                                                    ))}
                                                {postReactions.length > 10 && <span>and {postReactions.length - 10} others...</span>}
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                    <span
                        onMouseEnter={getPostReactions}
                        className="tooltip-container reactions-count"
                        onClick={openReactionsComponent}>
                        {sumAllReactions(reactions)}
                        <div className="tooltip-container-text tooltip-container-likes-bottom" data-testid="tooltip-container">
                            <div className="likes-block-icons-list">
                                {postReactions.length === 0 && <FaSpinner className="circle-notch" />}
                                {postReactions.length > 0 &&
                                    <>
                                    {postReactions.slice(0, 19).map(postReaction => (
                                        <span key={postReaction.username}>{postReaction.username}</span>
                                        ))}
                                    {postReactions.length > 1 && <span>and {postReactions.length - 1} others...</span>}
                                    </>
                                }
                            </div>
                        </div>
                    </span>
                </div>
            </div>
            <div className="comment tooltip-container" onClick={openCommentsComponent}>
                {post.commentsCount > 0 &&
                    <span onMouseEnter={getPostCommentNames}>
                        {shortenLongNumbers(post.commentsCount)} {post.commentsCount > 1 ? "Comments" : "Comment"}
                    </span>}
                <div className="tooltip-container-text tooltip-container-comments-bottom" >
                    <div className="likes-block-icons-list">
                        {commentNames.length === 0 && <FaSpinner className="circle-notch" />}
                        {commentNames.length > 0 &&
                            <>
                                {commentNames.slice(0, 19).map(comment => (
                                    <span key={generateString(10)}>{comment}</span>
                                ))}
                                {commentNames.length > 20 && <span>and {commentNames.length - 20} others...</span>}
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReactionsCommentsDisplay