import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { generateString, checkIfUserIsLocked } from '@services/utils/util.service';
import { checkPostPrivacy } from '@services/utils/postutils.service';
import { getAllPostsWithImages } from '@services/api/post.service';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { getFollowings } from '@services/api/follower.service';
import "./photos.scss"


const Photos = () => {
    const { currentUser } = useSelector(store => store.currentUser)
    const [photos, setPhotos] = useState([])
    const [posts, setPosts] = useState([])
    const [followings, setFollowings] = useState([])
    const [loading, setLoading] = useState(true)
    const [postsCount, setPostsCount] = useState(0)

    //Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const bottomLineRef = useRef()
    const bodyRef = useRef(null)
    //let appPosts = useRef([])
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
            const res = await getAllPostsWithImages(currentPage)
            console.log(res.data.posts);

            if (res.data.posts.length) {
                setPosts(res.data.posts)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }

    const getUserFollowings = async () => {
        try {
            const res = await getFollowings()
            setFollowings(res.data.followings)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        getUserFollowings()
    }, [])

    return (
        <>
            <div className='photos-container' ref={bodyRef}>
                <div className="photos">Photos</div>
                {posts.length &&
                    <div className="gallery-images">
                        {
                            currentUser && posts.map((post, index) => (
                                <div
                                    key={generateString(10)}
                                    className={`empty-post-div`}>
                                    {(!checkIfUserIsLocked(currentUser?.blockedBy, post?.userId, currentUser._id) || post?.userId === currentUser?._id)

                                        &&
                                        <>
                                            {checkPostPrivacy(post, currentUser, followings) &&
                                                <>
                                                    <div>Image</div>
                                                </>}
                                        </>}
                                </div>
                            ))
                        }
                    </div>
                }
                {loading && !posts.length &&
                    <div
                        className="card-element"
                        style={{ height: "350px" }}
                    >

                    </div>
                }
                {!loading && !posts.length &&
                    <div className="empty-page">
                        No Photos to display!
                    </div>
                }
                <div ref={bottomLineRef} style={{ marginBottom: "80px", height: "50px" }}></div>
            </div>
        </>
    )
}

export default Photos