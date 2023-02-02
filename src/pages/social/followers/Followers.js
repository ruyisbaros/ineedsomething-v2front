import React, { useState, useEffect, useCallback } from 'react'
import { generateString, checkIfUserIsLocked } from '@services/utils/util.service';
import Avatar from '@components/avatar/Avatar';
import { toast } from 'react-toastify';
import { navigateOnProfiles } from '@services/api/user.service';
import { uniqBy } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { blockUser, getFollowers, socketIOBlockAndUnblock, unBlockUser } from '@services/api/follower.service';
import CardElementStats from './../people/CardElementStats';
import CardElementButtons from './../people/CardElementButton';
import { socketService } from '@services/sockets/socket.service';
import "./followers.scss"


const Followers = () => {
    const { currentUser, token } = useSelector(store => store.currentUser)
    const [followers, setFollowers] = useState([]);
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchUserFollowers = useCallback(async () => {
        try {
            if (currentUser) {
                const res = await getFollowers(currentUser?._id)
                console.log(res.data)
                if (res.data.followers.length > 0) {
                    setFollowers((data) => {
                        const result = [...data, ...res.data.followers];
                        const allUsers = uniqBy(result, '_id');
                        return allUsers;
                    });
                }
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.message)
        }
    }, [currentUser])

    useEffect(() => {
        fetchUserFollowers()
    }, [fetchUserFollowers])

    //Block UnBlock
    const handleBlock = async (id) => {
        try {
            socketService?.socket?.emit("block user", { blockedUser: id, blockedBy: currentUser?._id })
            const res = await blockUser(id)
            toast.info(res.data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    const handleUnblock = async (id) => {
        try {
            socketService?.socket?.emit("unblock user", { blockedUser: id, blockedBy: currentUser?._id })
            const res = await unBlockUser(id)
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        setBlockedUsers(currentUser?.blocked)
    }, [currentUser?.blocked])

    useEffect(() => {
        socketIOBlockAndUnblock(currentUser, token, setBlockedUsers, dispatch)
    }, [currentUser, token, dispatch])

    return (
        <div className='card-container' >
            <div className="people">Followers</div>
            {followers.length &&
                <div className="card-element">
                    {followers.map(user => (
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
                                isChecked={checkIfUserIsLocked(blockedUsers, user._id)}
                                btnTextOne="Block"
                                btnTextTwo="UnBlock"
                                onClickBtnOne={() => handleBlock(user._id)}
                                onClickBtnTwo={() => handleUnblock(user._id)}
                                onNavigateToProfile={() => navigateOnProfiles(user, navigate)}
                            />
                        </div>
                    ))}
                </div>}
            {loading && !followers.length &&
                <div
                    className="card-element"
                    style={{ height: "350px" }}
                >

                </div>
            }
            {!loading && !followers.length &&
                <div className="empty-page">
                    You have no followers
                </div>
            }
            <div style={{ marginBottom: "80px", height: "80px" }}></div>
        </div>
    )
}

export default Followers