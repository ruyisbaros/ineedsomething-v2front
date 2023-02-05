import React from 'react'
import { FaCheck, FaCircle } from 'react-icons/fa'
import doubleCheckMark from "@assets/images/double-checkmark.png"

const ChatListBody = ({ data, profile }) => {
    return (
        <div className='conversation-message'>
            <span>{data.body}</span>
            {!data.isRead ? (
                <>
                    {data.receiverUsername === profile.username ? (
                        <FaCircle className='icon' />
                    ) : (
                        <FaCheck className='icon not-read' />
                    )}
                </>
            ) : (
                <>
                    {data.senderUsername === profile.username && (
                        <img className='icon read' src={doubleCheckMark} alt="" />
                    )}
                </>
            )}
        </div>
    )
}

export default ChatListBody
