import React from 'react'
import { Input, Button } from '@components/index';
import { FaCamera } from 'react-icons/fa';
import { Avatar } from '@components/avatar/Avatar';
import { Spinner } from '@components/spinner/Spinner';
import "./backgroundHeader.scss"

const BackgroundHeader = ({
    user,
    loading,
    url,
    onClick,
    tab,
    hasImage,
    tabItems,
    hasError,
    hideSettings,
    selectedFileImage,
    saveImage,
    cancelFileSelection,
    removeBackgroundImage,
    galleryImages
}) => {
    return (
        <div className="profile-banner" data-testid="profile-banner">
            <div className="save-changes-container" data-testid="save-changes-container">
                <div className="save-changes-box">
                    <div className="spinner-container">
                        <Spinner bgColor="white" />
                    </div>
                    <div className="save-changes-buttons">
                        <div className="save-changes-buttons-bg">
                            <Button label="Cancel" className="cancel change-btn" disabled={false} />
                            <Button label="Save Changes" className="save change-btn" disabled={false} />
                        </div>
                    </div>
                </div>
            </div>
            <div data-testid="profile-banner-image" className="profile-banner-image">
                <div className="delete-btn" data-testid="delete-btn">
                    <Button label="Remove" className="remove" disabled={false} />
                </div>
                <h3>Add a background image</h3>
                <img src="" alt="" />
            </div>
            <div className="profile-banner-data">
                <div data-testid="profile-pic" className="profile-pic"
                >
                    <Avatar name={user?.username} bgColor={user?.avatarColor} textColor="#ffffff" size={180} round={true}
                        avatarSrc="" />
                    <div className="profile-pic-select" data-testid="profile-pic-select">
                        <Input type="file" className="inputFile" />
                        <label>
                            <FaCamera className="camera" />
                        </label>
                    </div>
                </div>
                <div className="profile-name">Danny</div>
                <div className="profile-select-image">
                    <Input type="file" className="inputFile" />
                    <label data-testid="add-cover-photo">
                        <FaCamera className="camera" /> <span>Add Cover Photo</span>
                    </label>
                    Background select dropdown
                </div>
            </div>
            <div className="profile-banner-items">
                <ul className="banner-nav">
                    <div data-testid="tab-elements">
                        <li className="banner-nav-item">
                            <div className="banner-nav-item-name">
                                Icon
                                <p className="title">Item</p>
                            </div>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default BackgroundHeader
