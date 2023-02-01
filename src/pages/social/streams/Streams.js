import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "@pages/social/streams/streams.scss"
import Suggestions from '@components/suggestions/Suggestions'
import { getUserSuggestions } from '@services/api/suggestion'
import PostForm from '@components/posts/post-form/PostForm'
import Posts from '@components/posts/Posts'
import { getAllPosts } from '@services/api/post.service'
import { toast } from 'react-toastify';
import { orderBy, uniqBy } from 'lodash';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { getPosts } from '@services/api/post.service';
import { socketIOPost } from '@services/utils/postutils.service'
import useLocalStorage from '@hooks/useLocalStorage';
import { getReactionsByUsername } from '@services/api/reaction.service'
import { addReaction } from '@redux/reactionsSlicers'

const Streams = () => {
    const { allPosts } = useSelector(store => store)
    const dispatch = useDispatch()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [postsCount, setPostsCount] = useState(0)
    const storedUsername = useLocalStorage("username", "get")
    const [deletePostId] = useLocalStorage("selectedPostId", "delete")

    //Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const bottomLineRef = useRef()
    const bodyRef = useRef(null)
    let appPosts = useRef([])
    const PAGE_SIZE = 3
    //console.log(currentPage);

    useInfiniteScroll(bodyRef, bottomLineRef, fetchPostData)
    console.log(currentPage);
    function fetchPostData() {
        let pageNum = currentPage
        if (currentPage <= Math.round(postsCount / PAGE_SIZE)) {
            pageNum = pageNum + 1
            setCurrentPage(pageNum)
            fetchAllPosts()
        }
    }

    const fetchAllPosts = async () => {
        try {
            const res = await getAllPosts(currentPage)
            console.log(res.data.posts);

            if (res.data.posts.length) {
                /* appPosts = [...posts, ...res.data.posts]
                const allPosts = uniqBy(appPosts, "_id")
                const orderedPosts = orderBy(allPosts, ['createdAt'], ['desc']);
                setPosts(orderedPosts); */
                setPosts((data) => {
                    const result = [...data, ...res.data.posts];
                    const allPosts = uniqBy(result, '_id');
                    const orderedPosts = orderBy(allPosts, ['createdAt'], ['desc']);
                    return orderedPosts;
                });
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }
    //console.log(allPosts.posts)
    useEffect(() => {
        dispatch(getPosts())
        dispatch(getUserSuggestions())
    }, [dispatch])

    useEffect(() => {
        setLoading(allPosts?.isLoading)
        const orderedPosts = orderBy(allPosts?.posts, ['createdAt'], ['desc']);
        setPosts(orderedPosts);
        setPostsCount(allPosts?.totalPostsCount)
    }, [allPosts, dispatch])

    //Get user all post reactions
    const getUserReactions = async () => {
        try {
            const res = await getReactionsByUsername(storedUsername)
            dispatch(addReaction(res.data.reactions))
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        getUserReactions()
        deletePostId()
    }, [])

    //Post socket useEffect
    useEffect(() => {
        socketIOPost(posts, setPosts)
    }, [posts])

    return (
        <div className="streams">
            <div className="streams-content">
                <div className="streams-post" ref={bodyRef} style={{ background: "white" }}>
                    <PostForm />
                    <Posts allPosts={posts} postsLoading={loading} userFollowings={[]} />
                    <div ref={bottomLineRef} style={{ marginBottom: "50px", height: "50px" }}></div>
                </div>
                <div className="streams-suggestions">
                    <Suggestions />
                </div>
            </div>
        </div>
    )
}

export default Streams