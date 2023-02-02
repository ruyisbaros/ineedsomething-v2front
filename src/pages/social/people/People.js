import React, { useState, useEffect, useRef, useCallback } from 'react'
import { checkIfUserIsOnline, generateString, checkIfUserIsFollowed } from '@services/utils/util.service';
import { FaCircle } from 'react-icons/fa';
import Avatar from '@components/avatar/Avatar';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import CardElementStats from './CardElementStats';
import CardElementButtons from './CardElementButton';
import { toast } from 'react-toastify';
import { getAllUsers, navigateOnProfiles } from '@services/api/user.service';
import { uniqBy, cloneDeep } from 'lodash';
//import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./people.scss"
import { followUser, getFollowings, socketIOFollowUnFollow, unFollowUser } from '@services/api/follower.service';
import { socketService } from '@services/sockets/socket.service';


const People = () => {
    const { currentUser } = useSelector(store => store.currentUser)
    const [users, setUsers] = useState([]);
    //const dispatch = useDispatch()
    const navigate = useNavigate()
    const [totalUsersCount, setTotalUsersCount] = useState(0)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [followings, setFollowings] = useState([])
    const [loading, setLoading] = useState(true)

    //Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const bottomLineRef = useRef(null)
    const bodyRef = useRef(null)
    const PAGE_SIZE = 6

    useInfiniteScroll(bodyRef, bottomLineRef, fetchData)

    function fetchData() {
        let pageNum = currentPage;
        if (currentPage <= Math.round(totalUsersCount / PAGE_SIZE)) {
            pageNum += 1;
            setCurrentPage(pageNum);
            fetchAllUsers();
        }
    }

    const fetchAllUsers = useCallback(async () => {
        try {
            const res = await getAllUsers(currentPage)
            if (res.data.users.length > 0) {
                setUsers((data) => {
                    const result = [...data, ...res.data.users];
                    const allUsers = uniqBy(result, '_id');
                    return allUsers;
                });
            }
            setTotalUsersCount(res.data.totalUsers)

            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.message)
        }
    }, [currentPage])

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

    useEffect(() => {
        fetchAllUsers()

    }, [fetchAllUsers])

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
            user = cloneDeep(user)
            user.followersCount -= 1
            socketService?.socket?.emit("unFollow", user)
            const res = await unFollowUser(user._id)
            toast.info(res.data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        socketIOFollowUnFollow(users, followings, setFollowings, setUsers)
    }, [followings, users])

    return (
        <div className='card-container' ref={bodyRef}>
            <div className="people">Users</div>
            {users.length &&
                <div className="card-element">
                    {users.map(user => (
                        <div key={generateString(10)} className="card-element-item">
                            {checkIfUserIsOnline(onlineUsers, user.username) &&
                                <div className="card-element-item-indicator">
                                    <FaCircle className='online-indicator' />
                                </div>
                            }
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
                                isChecked={checkIfUserIsFollowed(followings, user._id, currentUser._id)}
                                btnTextOne="Follow"
                                btnTextTwo="UnFollow"
                                onClickBtnOne={() => handleFollowUser(user)}
                                onClickBtnTwo={() => handleUnFollowUser(user)}
                                onNavigateToProfile={() => navigateOnProfiles(user, navigate)}
                            />
                        </div>
                    ))}
                </div>}
            {loading && !users.length &&
                <div
                    className="card-element"
                    style={{ height: "350px" }}
                >

                </div>
            }
            {!loading && !users.length &&
                <div className="empty-page">
                    No User available
                </div>
            }
            <div ref={bottomLineRef} style={{ marginBottom: "80px", height: "50px" }}></div>
        </div>
    )
}

export default People