import React, { useState, useRef } from 'react'
import PostWrapper from '../post-wrapper/PostWrapper'
import { useSelector } from 'react-redux';
import photo from "@assets/images/photo.png"
import gif from "@assets/images/gif.png"
import feeling from "@assets/images/feeling.png"

import Avatar from '@components/avatar/Avatar';
import { FaTimes } from 'react-icons/fa';
import { bgColors } from '@services/utils/static.data';
import Input from '@components/inputs/Input';
import "./addPost.scss"
import Button from '@components/buttons/Button';

const AddPost = () => {
    const { gifModalIsOpen } = useSelector(store => store.modal)
    const { currentUser } = useSelector(store => store.currentUser)
    const [loading, setLoading] = useState(false)
    const [postImage, setPostImage] = useState("")
    const fileInputRef = useRef()
    return (
        <>
            <PostWrapper>
                <div>1</div>
                {!gifModalIsOpen && (
                    <div className='modal-box'
                        style={{}}>
                        {loading && (
                            <div className='modal-box-loading'>
                                <span>Posting...</span>
                            </div>)}
                        <div className='modal-box-header'>
                            <h2>Create Post</h2>
                            <button className='modal-box-header-cancel'>X</button>
                        </div>
                        <hr />
                        <div className="modal-box-content" data-testid="modal-box-content">
                            <div className="user-post-image" data-testid="box-avatar">
                                <Avatar name={currentUser?.username} bgColor={currentUser?.avatarColor} textColor="#ffffff" size={40}
                                    avatarSrc={currentUser?.profilePicture} />
                            </div>
                            <div className="modal-box-info">
                                <h5 className="inline-title-display" data-testid="box-username">
                                    {currentUser?.username}
                                </h5>
                                <p className="inline-display" data-testid="box-feeling">
                                    is feeling <img className="feeling-icon" src="" alt="" /> <span>Happy</span>
                                </p>
                                <div data-testid="box-text-display" className="time-text-display">
                                    <div className="selected-item-text" data-testid="box-item-text">
                                        Feeling
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            !postImage && (
                                <div className="modal-box-form">
                                    <div className='main'>
                                        <div className='flex-row'>
                                            <div
                                                className='editable flex-item'
                                                name="post"
                                                contentEditable={true}
                                                data-placeholder="Edit your post content..."
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        {
                            postImage && (
                                <div className="modal-box-image-form">
                                    <div
                                        className='post-input flex-item'
                                        name="post"
                                        contentEditable={true}
                                        data-placeholder="Edit your post content..."
                                    ></div>
                                    <div className="image-display">
                                        <div className="image-delete-btn"><FaTimes /></div>
                                        <img src="" alt="" className="post-image" />
                                    </div>
                                </div>
                            )}
                        <div className='modal-box-bg-colors'>
                            <ul>
                                {bgColors.map((color, index) => (
                                    <li
                                        key={index}
                                        className={`${color === "#ffffff" ? "whiteColorBorder" : ""}`}
                                        style={{ backgroundColor: `${color}`, cursor: "pointer" }}
                                    ></li>
                                ))}
                            </ul>
                        </div>
                        <span className='char_count'>100/100</span>
                        <div className="modal-box-selection" data-testid="modal-box-selection">
                            <ul className="post-form-list" data-testid="list-item">
                                <li className="post-form-list-item image-select">
                                    <Input name="image" ref={fileInputRef} type="file" className="file-input" />
                                    <img src={photo} alt="" /> Photo
                                </li>
                                <li className="post-form-list-item">
                                    <img src={gif} alt="" /> Gif
                                </li>
                                <li className="post-form-list-item">
                                    <img src={feeling} alt="" /> Feeling
                                </li>
                            </ul>
                        </div>
                        <div className="modal-box-button">
                            <Button label="Create Post" className="post-button" disabled={false} />
                        </div>
                    </div>
                )}
                {gifModalIsOpen && (
                    <div>GIF</div>
                )}
            </PostWrapper>
        </>
    )
}

export default AddPost
