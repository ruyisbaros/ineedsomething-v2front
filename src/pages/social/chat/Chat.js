import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getConversationList } from '@services/api/chat.service';
import ChatList from '@components/chat/list/ChatList';
import "./chat.scss"

const Chat = () => {
    const { selectedChatUser, chatList } = useSelector(store => store.chat)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getConversationList())
    }, [dispatch])

    return (
        <div className='private-chat-wrapper'>
            <div className="private-chat-wrapper-content">
                <div className="private-chat-wrapper-content-side">
                    <ChatList />
                </div>
                <div className="private-chat-wrapper-content-conversation">
                    {(selectedChatUser || chatList.length > 0) && (
                        <div>Chat Window</div>
                    )}
                    {!selectedChatUser && !chatList.length && (
                        <div className='no-chat'>
                            Select or search users for messaging
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Chat