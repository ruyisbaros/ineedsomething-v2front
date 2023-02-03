import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { generateString, checkIfUserIsLocked, getImage } from '@services/utils/util.service';
import { checkPostPrivacy } from '@services/utils/postutils.service';
import { getAllPostsWithImages } from '@services/api/post.service';
import { toast } from 'react-toastify';
import { getFollowings } from '@services/api/follower.service';
import GalleryImage from '@components/image/image-gallery/GalleryImage';
import ImageModal from '@components/image/image-modal/ImageModal';

import "./photos.scss"

const Photos = () => {
    const { currentUser } = useSelector(store => store.currentUser)
    const [imgUrl, setImgUrl] = useState([])
    const [posts, setPosts] = useState([])
    const [followings, setFollowings] = useState([])
    const [loading, setLoading] = useState(true)
    const [showImageModal, setShowImageModal] = useState(false)
    const [rightImageIndex, setRightImageIndex] = useState()
    const [leftImageIndex, setLeftImageIndex] = useState()
    const [lastItemRight, setLastItemRight] = useState(false)
    const [lastItemLeft, setLastItemLeft] = useState(false)

    const fetchAllPosts = async () => {
        try {
            const res = await getAllPostsWithImages(1)
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

    const postImgUrl = (post) => {
        const url = getImage(post?.imgId, post?.imgVersion)
        return post?.gifUrl ? post?.gifUrl : url
    }

    const emptyPost = (post) => {
        return (
            checkIfUserIsLocked(currentUser.blockedBy, post.userId) ||
            checkPostPrivacy(post, currentUser, followings)
        )
    }



    const onClickRight = () => {
        setLastItemLeft(false)
        setRightImageIndex((index) => index + 1)
        const lastImage = posts[posts.length - 1]
        const post = posts[rightImageIndex]
        const imgUrl = post?.gifUrl ? post?.gifUrl : getImage(post?.imgId, post?.imgVersion)
        setImgUrl(imgUrl)
        setLeftImageIndex(rightImageIndex)
        if (posts[rightImageIndex] === lastImage) {
            setLastItemRight(true)
        }
    }
    const onClickLeft = () => {
        setLastItemRight(false)
        setLeftImageIndex((index) => index - 1)
        const firstImage = posts[0]
        const post = posts[leftImageIndex - 1]
        const imgUrl = post?.gifUrl ? post?.gifUrl : getImage(post?.imgId, post?.imgVersion)
        setImgUrl(imgUrl)
        setRightImageIndex(leftImageIndex)
        if (firstImage === post) {
            setLastItemLeft(true)
        }

    }

    useEffect(() => {
        getUserFollowings()
        fetchAllPosts()
    }, [])

    return (
        <>
            <div className='photos-container' >
                {showImageModal &&
                    <ImageModal
                        image={imgUrl}
                        showArrow={true}
                        onClickRight={() => onClickRight()}
                        onClickLeft={() => onClickLeft()}
                        lastItemLeft={lastItemLeft}
                        lastItemRight={lastItemRight}
                        onCancel={() => {
                            setShowImageModal(!showImageModal)
                            setRightImageIndex(0)
                            setLeftImageIndex(0)
                            setLastItemRight(false)
                            setLastItemLeft(false)
                        }}
                    />
                }
                <div className="photos">Photos</div>
                {posts.length &&
                    <div className="gallery-images">
                        {
                            currentUser && posts.map((post, index) => (
                                <div
                                    key={generateString(10)}
                                    className={`${!emptyPost(post) ? "empty-post-div" : ""}`}>
                                    {(!checkIfUserIsLocked(currentUser?.blockedBy, post?.userId, currentUser._id) || post?.userId === currentUser?._id)

                                        &&
                                        <>
                                            {checkPostPrivacy(post, currentUser, followings) &&
                                                <>
                                            <GalleryImage
                                                post={post}
                                                showCaption={true}
                                                showDelete={false}
                                                imgSrc={postImgUrl(post)}
                                                onClick={() => {
                                                    setRightImageIndex(index + 1)
                                                    setLeftImageIndex(index)
                                                    setImgUrl(postImgUrl(post))
                                                    setShowImageModal(!showImageModal)
                                                    setLastItemLeft(index === 0)
                                                    setLastItemRight(index + 1 === posts.length)
                                                }}
                                            />
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
                <div style={{ marginBottom: "80px", height: "50px" }}></div>
            </div>
        </>
    )
}

export default Photos