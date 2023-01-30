import React from 'react'
import { FaSpinner } from 'react-icons/fa'
import like from "@assets/reactions/love.png"

import "./reactionsCommentsDisplay.scss"

const ReactionsCommentsDisplay = ({ post }) => {
    return (
        <div className="reactions-display">
            <div className="reaction">
                <div className="likes-block">
                    <div className="likes-block-icons reactions-icon-display">
                        <div className="tooltip-container">
                            <img data-testid="reaction-img" className="reaction-img" src={like} alt="" />
                            <div className="tooltip-container-text tooltip-container-bottom" data-testid="reaction-tooltip">
                                <p className="title">
                                    <img className="title-img" src={like} alt="" />
                                    Love
                                </p>
                                <div className="likes-block-icons-list">
                                    <FaSpinner className="circle-notch" />
                                    <div>
                                        <span>Manny</span>
                                    </div>
                                    <span>and 50 others...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span data-testid="reactions-count" className="tooltip-container reactions-count">
                        20
                        <div className="tooltip-container-text tooltip-container-likes-bottom" data-testid="tooltip-container">
                            <div className="likes-block-icons-list">
                                <FaSpinner className="circle-notch" />
                                <span>Stan</span>
                                <span>and 50 others...</span>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
            <div className="comment tooltip-container" data-testid="comment-container">
                <span data-testid="comment-count">
                    20 Comments
                </span>
                <div className="tooltip-container-text tooltip-container-comments-bottom" data-testid="comment-tooltip">
                    <div className="likes-block-icons-list">
                        <FaSpinner className="circle-notch" />
                        <div>
                            <span>Stan</span>
                            <span>and 50 others...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReactionsCommentsDisplay