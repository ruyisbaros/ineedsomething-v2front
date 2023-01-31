import React, { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { getSinglePostReactions } from '@services/api/reaction.service'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { formattedReactions, shortenLongNumbers, generateString } from '@services/utils/util.service';
import "./reactionsCommentsDisplay.scss"
import { reactionsMap } from '@services/utils/static.data';

const ReactionsCommentsDisplay = ({ post }) => {
    const [postReactions, setPostReactions] = useState([])
    const [reactions, setReactions] = useState([])
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

    const sumAllReactions = (reactions) => {
        if (reactions.length) {
            const result = reactions.map((item) => item.value).reduce((prev, next) => prev + next)
            return shortenLongNumbers(result)
        }
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
                            reactions.map(reaction => (
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
                                                        <div key={generateString(10)}>
                                                            {reaction.type === postReaction.type && <span>{postReaction.username}</span>
                                                            }
                                                        </div>
                                                    ))}
                                                    {postReactions.length > 1 && <span>and {postReactions.length - 1} others...</span>}
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                    <span onMouseEnter={getPostReactions} className="tooltip-container reactions-count">
                        {sumAllReactions(reactions)}
                        <div className="tooltip-container-text tooltip-container-likes-bottom" data-testid="tooltip-container">
                            <div className="likes-block-icons-list">
                                {postReactions.length === 0 && <FaSpinner className="circle-notch" />}
                                {postReactions.length > 0 &&
                                    <>
                                        {postReactions.map(postReaction => (
                                            <span key={generateString(10)}>{postReaction.username}</span>
                                        ))}
                                        {postReactions.length > 1 && <span>and {postReactions.length - 1} others...</span>}
                                    </>
                                }
                            </div>
                        </div>
                    </span>
                </div>
            </div>
            <div className="comment tooltip-container" data-testid="comment-container">
                <span data-testid="comment-count">
                    20 Comments
                </span>
                <div className="tooltip-container-text tooltip-container-comments-bottom" data-testid="comment-tooltip">
                    <div className="likes-block-icons-list">
                        <FaSpinner className="circle-notch" />
                        <div>
                            <span>Stan</span>
                            <span>and 50 others...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReactionsCommentsDisplay