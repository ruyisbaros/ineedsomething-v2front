import React from 'react'
import Avatar from '@components/avatar/Avatar';
import { Button } from '@components/index';
import "./suggestions.scss"

const Suggestions = () => {
    return (

        <div className="suggestions-list-container" data-testid="suggestions-container">
            <div className="suggestions-header">
                <div className="title-text">Suggestions</div>
            </div>
            <hr />
            <div className="suggestions-container">
                <div className="suggestions">
                    {[]?.map((user, index) => (
                        <div data-testid="suggestions-item" className="suggestions-item" key={index}>
                            <Avatar
                                name={user?.username}
                                bgColor={user?.avatarColor}
                                textColor="#ffffff"
                                size={40}
                                avatarSrc={user?.profilePicture}
                            />
                            <div className="title-text">{user?.username}</div>
                            <div className="add-icon">
                                <Button
                                    label="Follow"
                                    className="button follow"
                                    disabled={false}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="view-more">
                    View More
                </div>
            </div>
        </div>
    )
}

export default Suggestions