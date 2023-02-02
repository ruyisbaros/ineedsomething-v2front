import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Post from './single-post/Post';
import { checkIfUserIsLocked, generateString } from '@services/utils/util.service';
import { checkPostPrivacy } from '@services/utils/postutils.service';
import "./Posts.scss"

const Posts = ({ allPosts, userFollowings, postsLoading }) => {
    const { currentUser } = useSelector(store => store.currentUser)
    const [posts, setPosts] = useState([])
    const [followings, setFollowings] = useState([])
    const [setLoading] = useState(false)

    useEffect(() => {
        setPosts(allPosts)
        setFollowings(userFollowings)
        setLoading(postsLoading)
    }, [allPosts, userFollowings, postsLoading])


    return (
        <div className='posts-container'>
            {
                currentUser && posts?.map(post => (
                    <div >
                        {(!checkIfUserIsLocked(currentUser?.blockedBy, post?.userId, currentUser._id) || post?.userId === currentUser?._id)

                            &&
                            <>
                                {checkPostPrivacy(post, currentUser, followings) &&
                                    <>
                                <Post post={post} showIcons={false} />
                                    </>}
                            </>}
                    </div>
                ))
            }
        </div>
    )
}

export default Posts
