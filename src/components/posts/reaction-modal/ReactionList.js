import React from 'react'
import Avatar from '@components/avatar/Avatar';
import { reactionsMap } from '@services/utils/static.data';
import { generateString } from '@services/utils/util.service';
import "./reactionList.scss"

const ReactionList = ({ postReactions }) => {
    return (
        <div className="modal-reactions-container" data-testid="modal-reactions-container">
            {postReactions.map((reaction) => (
                <div className="modal-reactions-container-list" key={generateString(10)} >
                    <div className="img">
                        <Avatar
                            name={reaction?.username}
                            bgColor={reaction?.avatarColor}
                            textColor="#ffffff"
                            size={50}
                            avatarSrc={reaction?.profilePicture}
                        />
                        <img src={`${reactionsMap[reaction?.type]}`} alt="" className="reaction-icon" />
                    </div>
                    <span>{reaction?.username}</span>
                </div>
            ))}
        </div>
    )
}

export default ReactionList