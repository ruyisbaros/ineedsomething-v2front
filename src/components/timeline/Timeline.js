import React, { useState, useEffect } from 'react'
import PostFormSkeleton from '@components/posts/post-form/PostFormSkeleton'
import PostSkeleton from '@components/posts/PostSkeleton'
import { useSelector } from 'react-redux';
import { checkIfUserIsLocked } from '@services/utils/util.service';
import { checkPostPrivacy, socketIOPost } from '@services/utils/postutils.service';
import Post from '@components/posts/single-post/Post';
import { useParams } from 'react-router-dom';
import PostForm from '@components/posts/post-form/PostForm';
import { getFollowings } from '@services/api/follower.service';
import { toast } from 'react-toastify';
import CountContainer from './CountContainer';
import BasicInfo from './BasicInfo';
import SocialLinks from './SocialLinks';
import "./timeline.scss"

const Timeline = ({ userProfileData, loading }) => {
    const { currentUser } = useSelector(store => store.currentUser)
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState()
    const [followings, setFollowings] = useState([])
    const { username } = useParams()
    const [editableInputs, setEditableInputs] = useState({
        quote: '',
        work: '',
        school: '',
        location: ''
    });
    const [editableSocialInputs, setEditableSocialInputs] = useState({
        instagram: '',
        twitter: '',
        facebook: '',
        youtube: ''
    });

    console.log(userProfileData)

    useEffect(() => {
        setPosts(userProfileData?.posts)
    }, [userProfileData])

    const getUserFollowings = async () => {
        try {
            const res = await getFollowings()
            console.log(res);
            setFollowings(res.data.followings)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        setUser(userProfileData?.user)
        setEditableInputs({
            quote: userProfileData?.user?.quote,
            work: userProfileData?.user?.work,
            school: userProfileData?.user?.school,
            location: userProfileData?.user?.location
        })
        setEditableSocialInputs(userProfileData?.user?.social)
    }, [userProfileData])

    useEffect(() => {
        getUserFollowings()
    }, [])

    useEffect(() => {
        socketIOPost(posts, setPosts)
    }, [posts])

    return (
        <div className='timeline-wrapper'>
            <div className="timeline-wrapper-container">
                <div className="timeline-wrapper-container-side">
                    <div className="timeline-wrapper-container-side-count">
                        <CountContainer
                            loading={loading}
                            followersCount={user?.followersCount}
                            followingCount={user?.followingCount}
                        />
                    </div>
                    <div className='side-content'>
                        <BasicInfo
                            setEditableInputs={setEditableInputs}
                            editableInputs={editableInputs}
                            username={username}
                            profile={currentUser}
                            loading={loading}
                        />
                    </div>
                    <div className="side-content social">
                        <SocialLinks
                            setEditableSocialInputs={setEditableSocialInputs}
                            editableSocialInputs={editableSocialInputs}
                            username={username}
                            profile={currentUser}
                            loading={loading}
                        />
                    </div>
                </div>
                {loading && posts?.length < 0 && (
                    <div className="timeline-wrapper-container-main">
                        <div style={{ marginBottom: "10px" }}>
                            <PostFormSkeleton />
                        </div>
                        <>
                            {
                                [1, 2, 3, 4, 5].map(index => (
                                    <div key={index}>
                                        <PostSkeleton />
                                    </div>
                                ))
                            }
                        </>
                    </div>
                )}

                {!loading && posts?.length > 0 && (
                    <div className="timeline-wrapper-container-main">
                        {username === currentUser?.username && (
                            <PostForm />
                        )}
                        {
                            currentUser && posts?.map(post => (
                                <div key={post._id}>
                                    {(!checkIfUserIsLocked(currentUser?.blockedBy, post?.userId, currentUser._id) || post?.userId === currentUser?._id)

                                        &&
                                        <>
                                            {checkPostPrivacy(post, currentUser, followings) &&
                                                <>
                                                    <Post post={post} showIcons={username === currentUser?.username} />
                                                </>}
                                        </>}
                                </div>
                            ))
                        }
                    </div>
                )}
                {!loading && posts?.length === 0 && (
                    <div className="timeline-wrapper-container-main">
                        <div className='empty-page'>
                            No post to display!..
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Timeline
