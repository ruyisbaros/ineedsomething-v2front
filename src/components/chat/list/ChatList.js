import React, { useState, useEffect, useCallback } from 'react'
import Avatar from '@components/avatar/Avatar';
import { useSelector, useDispatch } from 'react-redux';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { Input } from '@components/index';
import { generateString } from '@services/utils/util.service';
import SearchList from './SearchList';
import { searchChatUsers } from '@services/api/user.service';
import { toast } from 'react-toastify';
import useDebounce from '@hooks/useDebounce';
import { ChatUtils } from '@services/utils/chat.utils.service';
import { find, cloneDeep } from 'lodash';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { setSelectedChatUser } from '@redux/chatSlicer';
import { addChatUsers, removeChatUsers, markMessagesAsRead } from '@services/api/chat.service';
import moment from "moment"
import ChatListBody from './ChatListBody';
import { findIndex } from 'lodash';
import { createSearchParams } from 'react-router-dom';
import "./chatList.scss"


const ChatList = () => {
    const { currentUser } = useSelector(store => store.currentUser)
    const { chatList } = useSelector(store => store.chat)

    const [searchResult, setSearchResult] = useState([])
    let [chatMessageList, setChatMessageList] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const [search, setSearch] = useState("")
    const [selectedUser, setSelectedUser] = useState(null)
    const [componentType, setComponentType] = useState("chatList")
    const debouncedValue = useDebounce(search, 1000) //make soft search
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const location = useLocation()
    const navigate = useNavigate()

    const removeSelectedUserFromList = (e) => {
        e.stopPropagation()
        chatMessageList = cloneDeep(chatMessageList)
        const userIndex = findIndex(chatMessageList, ["receiverId", searchParams.get("id")])
        if (userIndex > -1) {
            chatMessageList.splice(userIndex, 1)
            setSelectedUser(null)
            setChatMessageList(chatMessageList)
            ChatUtils.updateSelectedChatUser({
                chatMessageList,
                profile: currentUser,
                username: searchParams.get("username"),
                setSelectedChatUser,
                params: chatMessageList.length ? updateQueryParams(chatMessageList[0]) : null,
                pathname: location.pathname,
                navigate,
                dispatch
            })
        }
    }

    const updateQueryParams = (user) => {
        setSelectedUser(user)
        const params = ChatUtils.chatUrlParams(user, currentUser)
        ChatUtils.joinRoomEvent(user, currentUser)
        ChatUtils.privateChatMessages = []
        return params
    }

    const addUsernameToUrlQuery = async (user) => {
        try {
            const sender = find(ChatUtils.chatUsers, (userData) => userData.userOne === currentUser?.username && userData.userTwo === searchParams.get("username"))
            const params = updateQueryParams(user)
            const userTwoName = user?.receiverUsername !== currentUser?.username ? user?.receiverUsername : user?.senderUsername
            const receiverId = user?.receiverUsername !== currentUser?.username ? user?.receiverId : user?.senderId
            navigate(`${location.pathname}?${createSearchParams(params)}`)
            if (sender) {
                removeChatUsers(sender)
            }
            addChatUsers({ userOne: currentUser?.username, userTwo: userTwoName })
            if (user.receiverUsername === currentUser?.username && !user.isRead) {
                await markMessagesAsRead(currentUser?._id, receiverId)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    const searchUsers = useCallback(async (query) => {
        setIsSearching(true)
        try {
            setSearch(query)
            if (query) {
                const res = await searchChatUsers(query)
                setSearchResult(res.data.users)
                setIsSearching(false)
            }
        } catch (error) {
            setIsSearching(false)
            toast.error(error.response.data.message)
        }
    }, [])
    const addSelectedUserToList = useCallback((user) => {
        const newUser = {
            receiverId: user?._id,
            receiverUsername: user?.username,
            receiverAvatarColor: user?.avatarColor,
            receiverProfilePicture: user?.profilePicture,
            senderUsername: currentUser?.username,
            senderId: currentUser._id,
            senderAvatarColor: currentUser?.avatarColor,
            senderProfilePicture: currentUser?.profilePicture,
            body: ""
        }

        ChatUtils.joinRoomEvent(newUser, currentUser)
        ChatUtils.privateChatMessages = []
        const findUser = find(chatMessageList, (chat) => chat.receiverId === searchParams.get("id")
            || chat.senderId === searchParams.get("id"))
        if (!findUser) {
            const newChatList = [newUser, ...chatMessageList]
            setChatMessageList(newChatList)
            if (!chatList.length) {
                dispatch(setSelectedChatUser({ isLoading: false, user: newUser }))
                const userTwoName = newUser?.receiverUsername !== currentUser?.username ? newUser?.receiverUsername : newUser?.senderUsername

                addChatUsers({ userOne: currentUser?.username, userTwo: userTwoName })
            }
        }

    }, [currentUser, chatMessageList, searchParams, dispatch, chatList])

    useEffect(() => {
        if (selectedUser && componentType === 'searchList') {

            addSelectedUserToList(selectedUser)
        }
    }, [addSelectedUserToList, componentType, selectedUser])

    useEffect(() => {
        if (debouncedValue) {
            searchUsers(debouncedValue)
        }
    }, [searchUsers, debouncedValue])

    useEffect(() => {
        setChatMessageList(chatList)
    }, [chatList])
    console.log(chatMessageList);
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
                    <Input
                        id="message"
                        name="message"
                        type="text"
                        className="search-input"
                        labelText=""
                        placeholder="Search"
                        value={search}
                        handleChange={(e) => {
                            setIsSearching(true)
                            setSearch(e.target.value)
                        }}
                    />
                    {search && <FaTimes className="times" onClick={() => {
                        setIsSearching(false)
                        setSearch("")
                        setSearchResult([])
                    }} />}
                </div>

                <div className="conversation-container-body">
                    {!search && <div className="conversation">
                        {chatMessageList.map((data) => (

                            <div
                                key={generateString(10)}
                                className={`conversation-item ${searchParams.get("username") === data.receiverUsername || searchParams.get("username") === data.senderUsername ? "active" : ""}`}
                                onClick={() => addUsernameToUrlQuery(data)}
                            >
                                <div className="avatar">
                                    <Avatar
                                        name={data.receiverUsername === currentUser?.username ? currentUser?.username : data.receiverUsername}
                                        bgColor={data.receiverUsername !== currentUser?.username ? data.receiverAvatarColor : data.senderAvatarColor}
                                        textColor="#ffffff"
                                        size={40}
                                        avatarSrc={data.receiverUsername !== currentUser?.username ? data.receiverProfilePicture : data.senderProfilePicture}
                                    />
                                </div>
                                <div className={`title-text ${(selectedUser && !data.body) && "selected-user-text"}`}>
                                    {data.receiverUsername !== currentUser?.username ? data.receiverUsername : data.senderUsername}
                                </div>
                                {data.createdAt && <div className="created-date">{moment(data.createdAt).fromNow()}</div>}
                                {!data.body && <div className="created-date"
                                    onClick={removeSelectedUserFromList}>
                                    <FaTimes />
                                </div>}

                                {data.body && !data.deleteForMe && !data.deleteForEveryone && (
                                    <ChatListBody data={data} profile={currentUser} />
                                )}
                                {data.deleteForMe && data.deleteForEveryone && <div className="conversation-message">
                                    <span className="message-deleted">message deleted</span>
                                </div>}
                                {data.deleteForMe && !data.deleteForEveryone && data.senderUsername !== currentUser?.username && <div className="conversation-message">
                                    <span className="message-deleted">message deleted</span>
                                </div>}
                                {!data.deleteForMe && data.deleteForEveryone && data.receiverUsername !== currentUser.username &&
                                    <ChatListBody data={data} profile={currentUser} />
                                }
                            </div>
                        ))}
                    </div>}

                    <SearchList
                        searchTerm={search}
                        result={searchResult}
                        isSearching={isSearching}
                        setSearchResult={setSearchResult}
                        setIsSearching={setIsSearching}
                        setSearch={setSearch}
                        setSelectedUser={setSelectedUser}
                        setComponentType={setComponentType}
                    />
                </div>
            </div>
        </div>
    )
}

export default ChatList
