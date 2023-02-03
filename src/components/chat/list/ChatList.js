import React from 'react'
import Avatar from '@components/avatar/Avatar';
import { useSelector } from 'react-redux';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { Input } from '@components/index';
import "./chatList.scss"

const ChatList = () => {
    const { currentUser } = useSelector(store => store.currentUser)

    const removeSelectedUserFromList = () => { }

    return (
        <div data-testid="chatList">
            <div className="conversation-container">
                <div className="conversation-container-header">
                    <div className="header-img">
                        <Avatar name={currentUser?.username} bgColor={currentUser?.avatarColor} textColor="#ffffff" size={40}
                            avatarSrc={currentUser?.profilePicture} />
                    </div>
                    <div className="title-text">{currentUser?.username}</div>
                </div>

                <div className="conversation-container-search" data-testid="search-container">
                    <FaSearch className="search" />
                    <Input id="message" name="message" type="text" className="search-input" labelText="" placeholder="Search" />
                    <FaTimes className="times" />
                </div>

                <div className="conversation-container-body">
                    <div className="conversation">
                        {[].map((data) => (
                            <div data-testid="conversation-item" className="conversation-item">
                                <div className="avatar">
                                    <Avatar name="placeholder" bgColor="red" textColor="#ffffff" size={40} avatarSrc="" />
                                </div>
                                <div className="title-text">
                                    Danny
                                </div>
                                <div className="created-date">1 hr ago</div>
                                <div className="created-date" onClick={removeSelectedUserFromList}>
                                    <FaTimes />
                                </div>
                                {/* <!-- chat list body component --> */}
                                <div className="conversation-message">
                                    <span className="message-deleted">message deleted</span>
                                </div>
                                <div className="conversation-message">
                                    <span className="message-deleted">message deleted</span>
                                </div>
                                {/* <!-- chat list body component --> */}
                            </div>
                        ))}
                    </div>

                    {/* <!-- search component --> */}
                </div>
            </div>
        </div>
    )
}

export default ChatList
