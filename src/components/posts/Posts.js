import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Post from './single-post/Post';
import "./Posts.scss"
import { checkIfUserIsFollowed, generateString } from '@services/utils/util.service';
import { checkPostPrivacy } from '@services/utils/postutils.service';

const Posts = ({ allPosts, userFollowings, postsLoading }) => {
    const { currentUser } = useSelector(store => store.currentUser)
    const [posts, setPosts] = useState([])
    const [followings, setFollowings] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setPosts(allPosts)
        setFollowings(userFollowings)
        setLoading(postsLoading)
    }, [allPosts, userFollowings, postsLoading])


    return (
        <div className='posts-container'>
            {
                posts?.map(post => (
                    <div key={generateString(10)}>
                        {(!checkIfUserIsFollowed(currentUser?.blockedBy, post?.userId) || post?.userId === currentUser?._id)
                            &&
                            <>
                                {checkPostPrivacy(post, currentUser, followings) &&
                                    <>
                                <Post key={generateString(10)} post={post} showIcons={false} />
                                    </>}
                            </>}
                    </div>
                ))
            }
        </div>
    )
}

export default Posts
