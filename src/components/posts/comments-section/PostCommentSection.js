import React from 'react'
import CommentArea from '../comment-area/CommentArea'

const PostCommentSection = ({ post }) => {
    return (
        <div>
            <CommentArea post={post} />
        </div>
    )
}

export default PostCommentSection
