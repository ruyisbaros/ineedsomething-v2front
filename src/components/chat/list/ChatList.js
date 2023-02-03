import React, { useState, useEffect, useCallback } from 'react'
import Avatar from '@components/avatar/Avatar';
import { useSelector } from 'react-redux';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { Input } from '@components/index';
import { generateString } from '@services/utils/util.service';
import SearchList from './SearchList';
import { searchChatUsers } from '@services/api/user.service';
import { toast } from 'react-toastify';
import useDebounce from '@hooks/useDebounce';
import "./chatList.scss"

const ChatList = () => {
    const { currentUser } = useSelector(store => store.currentUser)
    const { selectedChatUser, chatList } = useSelector(store => store.chat)

    const [searchResult, setSearchResult] = useState([])
    const [chatMessageList, setChatMessageList] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const [search, setSearch] = useState("")
    const [selectedUser, setSelectedUser] = useState(null)
    const [componentType, setComponentType] = useState("chatList")
    const debouncedValue = useDebounce(search, 1000) //make soft search
    const removeSelectedUserFromList = () => { }

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

    useEffect(() => {
        if (debouncedValue) {
            searchUsers(debouncedValue)
        }
    }, [searchUsers, debouncedValue])

    useEffect(() => {
        setChatMessageList(chatList)
    }, [chatList])

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
                    <div className="conversation">
                        {[].map((data) => (
                            <div key={generateString(10)} className="conversation-item">
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
