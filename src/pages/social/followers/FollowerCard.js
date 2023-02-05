import React, { useEffect, useState, useCallback } from 'react'
import Avatar from '@components/avatar/Avatar';
import { FaUserPlus } from 'react-icons/fa';
import { Button } from '@components/index';
import { toast } from 'react-toastify';
import { socketService } from '@services/sockets/socket.service';
import { useSelector } from 'react-redux';
import { useSearchParams, useParams } from 'react-router-dom';
import { getFollowers, blockUser, unBlockUser } from '@services/api/follower.service';
import { uniqBy } from 'lodash';
import { getUserByUsername } from '@services/api/user.service';
import { socketIOBlockAndUnblockCard } from './../../../services/api/follower.service';
import { shortenLongNumbers } from '@services/utils/util.service';
import { checkIfUserIsLocked } from './../../../services/utils/util.service';
import "./followers.scss"


const FollowerCard = ({ userData }) => {

    const { currentUser } = useSelector(store => store.currentUser)
    const [followers, setFollowers] = useState([]);
    const [user, setUser] = useState(userData);
    const [loading, setLoading] = useState(true)
    //const dispatch = useDispatch()
    const [searchParams] = useSearchParams();
    const { username } = useParams();

    const fetchUserFollowers = useCallback(async () => {
        try {
            const res = await getFollowers(searchParams.get('id'))
            console.log(res.data)
            if (res.data.followers.length > 0) {
                setFollowers((data) => {
                    const result = [...data, ...res.data.followers];
                    const allUsers = uniqBy(result, '_id');
                    return allUsers;
                });
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.message)
        }
    }, [searchParams])



    const getUserProfileByUsername = useCallback(async () => {
        try {
            const response = await getUserByUsername(
                searchParams.get('id'),
                username,
                searchParams.get('uId')
            );
            setUser(response.data.user);
        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.message)
        }
    }, [username, searchParams])

    useEffect(() => {
        fetchUserFollowers()
        getUserProfileByUsername()
    }, [fetchUserFollowers, getUserProfileByUsername])

    //Block UnBlock
    const handleBlock = async (userInfo) => {
        try {
            socketService?.socket?.emit("block user", {
                blockedUser: userInfo._id,
                blockedBy: user._id
            })
            const res = await blockUser(userInfo._id)
            toast.info(res.data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    const handleUnblock = async (userInfo) => {
        try {
            socketService?.socket?.emit("unblock user", { blockedUser: userInfo._id, blockedBy: user?._id })
            const res = await unBlockUser(userInfo._id)
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        socketIOBlockAndUnblockCard(user, setUser)
    }, [user])

    return (
        <div >
            {followers.length > 0 && (
                <div className="follower-card-container">
                    {followers.map((data, index) => (
                        <div className="follower-card-container-elements" key={index}>
                            <div className="follower-card-container-elements-content">
                                <div className="card-avatar">
                                    <Avatar name={data?.username} bgColor={data?.avatarColor} textColor="#ffffff" size={60}
                                        avatarSrc={data?.profilePicture} />
                                </div>
                                <div className="card-user">
                                    <span className="name">{data?.username}</span>
                                    <p className="count">
                                        <FaUserPlus className="heart" />{' '}
                                        <span >{shortenLongNumbers(data?.followingCount)}</span>
                                    </p>
                                </div>
                                {currentUser?.username === username && <div className="card-following-button" data-testid="card-following-button">
                                    {!checkIfUserIsLocked(user?.blocked, data?._id) &&
                                        <Button label="Block"
                                            className="following-button"
                                            disabled={false}
                                            handleClick={() => handleBlock(data)}
                                        />}
                                    {checkIfUserIsLocked(user?.blocked, data?._id) &&
                                        <Button
                                            label="Unblock"
                                            className="following-button isUserFollowed"
                                            disabled={false}
                                            handleClick={() => handleUnblock(data)}
                                        />}
                                </div>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {!loading && followers.length <= 0 && <div className="empty-page">There are no followers to display</div>}
        </div>
    )
}

export default FollowerCard
