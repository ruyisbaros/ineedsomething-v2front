import React, { useState, useRef, useCallback, useEffect } from 'react'
import PostWrapper from '../post-wrapper/PostWrapper'
import { useSelector } from 'react-redux';
import photo from "@assets/images/photo.png"
import gif from "@assets/images/gif.png"
import feelingImg from "@assets/images/feeling.png"
import Avatar from '@components/avatar/Avatar';
import { FaGlobe, FaTimes } from 'react-icons/fa';
import { bgColors, privacyList } from '@services/utils/static.data';
import Input from '@components/inputs/Input';
import Button from '@components/buttons/Button';
import { selectPostBackground } from '@services/utils/postutils.service';
import SelectDropdown from '@components/select-dropdown/SelectDropdown';
import useDetectOutsideClick from '@hooks/useDetectOutsideClick';
import { find } from 'lodash';
import Feelings from '@components/feelings/Feelings';
import "./addPost.scss"

const AddPost = () => {
    const { gifModalIsOpen, feeling, feelingsIsOpen } = useSelector(store => store.modal)
    const { currentUser } = useSelector(store => store.currentUser)
    const { privacy } = useSelector(store => store.post)
    const [loading] = useState(false)
    const [postImage] = useState("")
    const [textAreaBackground, setTextAreaBackground] = useState("#ffffff")
    const [disable, setDisable] = useState(false)
    const [selectedItem, setSelectedItem] = useState({
        topText: "Public",
        subText: "Anyone on page",
        icon: <FaGlobe className='globe-icon globe' />
    })
    const [postData, setPostData] = useState({
        post: "",
        bgColor: textAreaBackground,
        privacy: privacy,
        feelings: "",
        gifUrl: "",
        profilePicture: currentUser?.profilePicture,
        image: ""
    })
    const fileInputRef = useRef()
    const privacyRef = useRef(null)
    const feelingsRef = useRef(null)
    const [togglePrivacy, setTogglePrivacy] = useDetectOutsideClick(privacyRef, false)
    const [toggleFeelings, setToggleFeelings] = useDetectOutsideClick(feelingsRef, feelingsIsOpen)

    const selectBackground = (bgColor) => {
        selectPostBackground(bgColor, postData, setTextAreaBackground, setPostData, setDisable)
    }

    const displayPostPrivacy = useCallback(() => {
        if (privacy) {
            const postPrivacy = find(privacyList, (item) => item.topText === privacy)
            setSelectedItem(postPrivacy)
        }
    }, [privacy])

    useEffect(() => { displayPostPrivacy() }, [displayPostPrivacy])

    const fileInputClicked = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => { }

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
                                {feeling.name && <p className="inline-display" data-testid="box-feeling">
                                    is feeling <img className="feeling-icon" src={feeling.image} alt="" /> <span>{feeling.name}</span>
                                </p>}
                                <div onClick={() => setTogglePrivacy(!togglePrivacy)} className="time-text-display">
                                    <div className="selected-item-text" data-testid="box-item-text">
                                        {selectedItem.topText}
                                    </div>
                                    <div ref={privacyRef}>
                                        <SelectDropdown isActive={togglePrivacy} items={privacyList} setSelectedItem={setSelectedItem} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            !postImage && (
                                <div className="modal-box-form"
                                    style={{ background: `${textAreaBackground}` }}>
                                    <div className='main'
                                        style={{ margin: textAreaBackground !== "#ffffff" ? "0 auto" : "" }}
                                    >
                                        <div className='flex-row'>
                                            <div
                                                className={`editable flex-item ${textAreaBackground !== "#ffffff" ? "textInputColor" : ""}`}
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
                                        onClick={() => selectBackground(color)}
                                    ></li>
                                ))}
                            </ul>
                        </div>
                        <span className='char_count'>100/100</span>
                        <>
                            {toggleFeelings && (
                                <div ref={feelingsRef}>
                                    <Feelings />
                                </div>
                            )}
                            <div className="modal-box-selection" data-testid="modal-box-selection">
                                <ul className="post-form-list" data-testid="list-item">
                                    <li className="post-form-list-item image-select"
                                        onClick={fileInputClicked}>
                                        <Input
                                            ref={fileInputRef}
                                            name="image"
                                            type="file"
                                            className="file-input"
                                            onClick={() => {
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value = null
                                                }
                                            }}
                                            handleChange={handleFileChange}
                                        />
                                        <img src={photo} alt="" /> Photo
                                    </li>
                                    <li className="post-form-list-item">
                                        <img src={gif} alt="" /> Gif
                                    </li>
                                    <li className="post-form-list-item" onClick={() => setToggleFeelings(!toggleFeelings)}>
                                        <img src={feelingImg} alt="" /> Feeling
                                    </li>
                                </ul>
                            </div>
                        </>
                        <div className="modal-box-button">
                            <Button label="Create Post" className="post-button" disabled={disable} />
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
