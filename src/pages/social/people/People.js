import React, { useState, useEffect, useRef } from 'react'
import "./people.scss"
import { checkIfUserIsOnline, generateString, checkIfUserIsFollowed } from '@services/utils/util.service';
import { FaCircle } from 'react-icons/fa';
import Avatar from '@components/avatar/Avatar';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import CardElementStats from './CardElementStats';
import CardElementButtons from './CardElementButton';

const People = () => {
    const [users, setUsers] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const bottomLineRef = useRef(null)
    const bodyRef = useRef(null)

    useInfiniteScroll(bodyRef, bottomLineRef, fetchData)

    function fetchData() { }

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
                                isChecked={checkIfUserIsFollowed([], user._id)}
                                btnTextOne="Follow"
                                btnTextTwo="UnFollow"
                                onClickBtnOne={() => { }}
                                onClickBtnTwo={() => { }}
                                onNavigateToProfile={() => { }}
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