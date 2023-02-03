import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import "./chat.scss"
import { getConversationList } from '@services/api/chat.service';

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
                    <div>Chat list</div>
                </div>
                <div className="private-chat-wrapper-content-conversation">
                    {(selectedChatUser || chatList.length) && (
                        <div>Chat Window</div>
                    )}
                    {!selectedChatUser && !chatList.length && (
                        <div className='no-chat'>
                            Select or search users to chat with
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Chat