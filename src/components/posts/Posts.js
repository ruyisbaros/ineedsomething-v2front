import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Post from './single-post/Post';
import "./Posts.scss"

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
                    <div key={post._id}>
                        <Post post={post} showIcons={false} />
                    </div>
                ))
            }
        </div>
    )
}

export default Posts
