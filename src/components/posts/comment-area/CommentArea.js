import React, { useState, useEffect, useCallback } from 'react'
import { FaRegCommentAlt } from 'react-icons/fa'
import Reactions from '../reactions/Reactions'
import like from "@assets/reactions/like.png"
import { find, cloneDeep, filter } from 'lodash';
import { firstLetterUpperCase } from '@services/utils/util.service'
import { reactionsMap } from '@services/utils/static.data';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addUserReaction, getUserSingleReactionOfPost, removeReactionFromDb } from '@services/api/reaction.service'
import useLocalStorage from '@hooks/useLocalStorage';
import { addReaction } from '@redux/reactionsSlicers'
import { socketService } from '@services/sockets/socket.service'
import { updatePostItem, clearPost } from '@redux/postSlicer';
import "./commentArea.scss"


const CommentArea = ({ post }) => {
    let { reactions } = useSelector(store => store.reactions)
    const { currentUser } = useSelector(store => store.currentUser)
    const [userSelectedReaction, setUserSelectedReaction] = useState("")
    const dispatch = useDispatch()
    const storedUsername = useLocalStorage("username", "get")
    const selectedPostId = useLocalStorage("selectedPostId", "get")
    const [setSelectedPostId] = useLocalStorage("selectedPostId", "set")

    const toggleCommentInput = () => {
        if (!selectedPostId) {
            setSelectedPostId(post._id)
            dispatch(updatePostItem(post))
        } else {
            if (selectedPostId === post._id) {
                setSelectedPostId("")
                dispatch(clearPost())
            } else {
                setSelectedPostId(post._id)
                dispatch(updatePostItem(post))
            }
        }
    }

    //Find user's relevant post reaction
    const selectedReaction = useCallback((postReactions) => {
        const userReaction = find(postReactions, (reaction) => reaction.postId === post._id)
        const result = userReaction ? firstLetterUpperCase(userReaction.type) : ""
        setUserSelectedReaction(result)
    }, [post])

    const addReactionPost = async (reaction) => {
        //post = cloneDeep(post)
        try {
            const res = await getUserSingleReactionOfPost(storedUsername, post?._id)
            console.log(res.data);
            const status = res.data.reactions ? true : false
            //console.log(status);

            post = updatePostReaction(reaction, status, res?.data?.reactions?.type)
            //console.log(post);
            const updatedReactions = addNewReaction(reaction, status, res?.data?.reactions?.type)
            reactions = [...updatedReactions]
            dispatch(addReaction(reactions))
            sendSocketIOReactions(
                post,
                reaction,
                status,
                res?.data?.reactions?.type
            )
            const reactionData = {
                userTo: post?.userId,
                postId: post?._id,
                type: reaction,
                postReactions: post.reactions,
                profilePicture: currentUser?.profilePicture,
                previousReaction: status ? res?.data?.reactions?.type : ""
            }
            //First time react
            if (!status) {
                await addUserReaction(reactionData)
                //not first time
            } else {
                reactionData.previousReaction = res?.data?.reactions?.type
                //Means remove
                if (reaction === reactionData.previousReaction) {
                    //console.log(post.reactions)
                    await removeReactionFromDb(post?._id, reactionData.previousReaction, post?.reactions)
                } else {
                    await addUserReaction(reactionData)
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    //update post reaction accordingly
    const updatePostReaction = (newReaction, hasResponse, previousReaction) => {
        console.log("update func")
        post = cloneDeep(post)
        if (!hasResponse) {
            post.reactions[newReaction] += 1
        } else {
            if (post.reactions[previousReaction] > 0) {
                post.reactions[previousReaction] = 0
            }
            if (previousReaction !== newReaction) {
                post.reactions[newReaction] += 1
            }
        }
        console.log(post);
        return post
    }

    //Update redux store reaction
    const addNewReaction = (newReaction, hasResponse, previousReaction) => {
        const newPostReaction = {
            avatarColor: currentUser?.avatarColor,
            postId: post?._id,
            createdAt: post?.createdAt,
            profilePicture: currentUser?.profilePicture,
            username: currentUser?.username,
            type: newReaction
        }
        const postReactions = filter(reactions, (reaction) => reaction.postId !== post._id)
        if (hasResponse && previousReaction !== newReaction) {
            postReactions.push(newPostReaction)
        } else if (!hasResponse) {
            postReactions.push(newPostReaction)
        }
        return postReactions
    }

    //Emit socket IO reaction
    const sendSocketIOReactions = (post, reaction, hasResponse, previousReaction) => {
        const socketReactionData = {
            userTo: post.userId,
            postId: post._id,
            username: currentUser?.username,
            avatarColor: currentUser?.avatarColor,
            type: reaction,
            postReactions: post.reactions,
            profilePicture: currentUser?.profilePicture,
            previousReaction: hasResponse ? previousReaction : ""
        }

        socketService.socket.emit("reaction", socketReactionData)
    }

    useEffect(() => {
        selectedReaction(reactions)
    }, [selectedReaction, reactions])


    return (
        <div className="comment-area" data-testid="comment-area">
            <div className="like-icon reactions">
                <div className="likes-block" onClick={() => addReactionPost("like")}>
                    <div className={`likes-block-icons reaction-icon ${userSelectedReaction.toLowerCase()}`}>
                        {userSelectedReaction &&
                            <div className={`reaction-display ${userSelectedReaction.toLowerCase()}`}
                            data-testid="selected-reaction">
                                <img className="reaction-img"
                                    src={reactionsMap[userSelectedReaction.toLowerCase()]} alt="" />
                                <span>{userSelectedReaction}</span>
                            </div>}
                        {!userSelectedReaction && <div className="reaction-display" >
                            <img className="reaction-img" src={like} alt="" /> <span>Like</span>
                        </div>}
                    </div>
                </div>
                <div className="reactions-container app-reactions">
                    <Reactions handleClick={addReactionPost} />
                </div>
            </div>
            <div className="comment-block" onClick={toggleCommentInput}>
                <span className="comments-text">
                    <FaRegCommentAlt className="comment-alt" /> <span>Comments</span>
                </span>
            </div>
        </div>
    )
}

export default CommentArea
