import React, { useState, useEffect } from 'react'
import { generateString, checkIfUserIsFollowed } from '@services/utils/util.service';
import Avatar from '@components/avatar/Avatar';
import { toast } from 'react-toastify';
import { navigateOnProfiles } from '@services/api/user.service';
import { useNavigate } from 'react-router-dom';
import { followUser, getFollowings, socketIOFollowUnFollow, unFollowUser } from '@services/api/follower.service';
import { socketService } from '@services/sockets/socket.service';
import { socketIORemoveFollowing } from './../../../services/api/follower.service';
import CardElementStats from './../people/CardElementStats';
import CardElementButtons from './../people/CardElementButton';
import "./following.scss"


const Following = () => {
    const navigate = useNavigate()
    const [totalUsersCount, setTotalUsersCount] = useState(0)
    const [followings, setFollowings] = useState([])
    const [loading, setLoading] = useState(true)

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


    //FOLLOW UNFOLLOW
    const handleFollowUser = async (user) => {
        try {
            const res = await followUser(user._id)
            toast.info(res.data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    const handleUnFollowUser = async (user) => {
        try {
            socketService?.socket?.emit("unFollow", user)
            const res = await unFollowUser(user._id)
            toast.info(res.data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        socketIORemoveFollowing(followings, setFollowings)
    }, [followings])

    return (
        <div className='card-container' >
            <div className="people">Followings</div>
            {followings.length &&
                <div className="card-element">
                    {followings.map(user => (
                        <div key={user?.username} className="card-element-item">

                            <div className="card-element-header">
                                <div className="card-element-header-bg"></div>
                                <Avatar
                                    name={user?.username}
                                    bgColor={user?.avatarColor}
                                    textColor="#ffffff"
                                    size={120}
                                    avatarSrc={user?.profilePicture}
                                />
                                <div className='card-element-header-text'>
                                    <span className='card-element-header-name'>{user?.username}</span>
                                </div>
                            </div>
                            <CardElementStats
                                postsCount={user.postsCount}
                                followersCount={user.followersCount}
                                followingCount={user.followingCount}
                            />
                            <CardElementButtons
                                isChecked={checkIfUserIsFollowed(followings, user._id)}
                                btnTextOne="Follow"
                                btnTextTwo="UnFollow"
                                onClickBtnOne={() => handleFollowUser(user)}
                                onClickBtnTwo={() => handleUnFollowUser(user)}
                                onNavigateToProfile={() => navigateOnProfiles(user, navigate)}
                            />
                        </div>
                    ))}
                </div>}
            {loading && !followings.length &&
                <div
                    className="card-element"
                    style={{ height: "350px" }}
                >

                </div>
            }
            {!loading && !followings.length &&
                <div className="empty-page">
                    You don't follow anyone!
                </div>
            }
            <div style={{ marginBottom: "80px", height: "80px" }}></div>
        </div>
    )
}

export default Following 