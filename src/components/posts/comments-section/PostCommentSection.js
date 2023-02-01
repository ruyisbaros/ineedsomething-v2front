import React from 'react'
import CommentArea from '../comment-area/CommentArea'
import ReactionsCommentsDisplay from '../reactions/ReactionsCommentsDisplay'

const PostCommentSection = ({ post }) => {
    return (
        <div>
            <ReactionsCommentsDisplay post={post} />
            <CommentArea post={post} />
        </div>
    )
}

export default PostCommentSection
