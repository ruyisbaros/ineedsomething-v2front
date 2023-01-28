import React, { useState, useRef, useCallback, useEffect } from 'react'
import PostWrapper from '../post-wrapper/PostWrapper'
import { useSelector, useDispatch } from 'react-redux';
import photo from "@assets/images/photo.png"
import gif from "@assets/images/gif.png"
import feelingImg from "@assets/images/feeling.png"
import Avatar from '@components/avatar/Avatar';
import { FaArrowLeft, FaGlobe, FaTimes } from 'react-icons/fa';
import { bgColors, privacyList } from '@services/utils/static.data';
import Input from '@components/inputs/Input';
import Button from '@components/buttons/Button';
import { closePostCreateModal, handlePostText, selectPostBackground, sendPostWithImage } from '@services/utils/postutils.service';
import SelectDropdown from '@components/select-dropdown/SelectDropdown';
import useDetectOutsideClick from '@hooks/useDetectOutsideClick';
import { find } from 'lodash';
import Feelings from '@components/feelings/Feelings';
import { readImageAsBase64, validateImageFile } from '@services/utils/image.utils.service';
import "./addPost.scss"
import { clearPost, updatePostItem } from '@redux/postSlicer';
import { closeModal, toggleGifModal } from '@redux/postModalSlicer';
import Giphy from '@components/giphy/Giphy';
import { toast } from 'react-toastify';
import { createPostNoImage } from '@services/api/post.service';
import Spinner from '@components/spinner/Spinner';

const AddPost = () => {
    const { gifModalIsOpen, feeling, feelingsIsOpen } = useSelector(store => store.modal)
    const { currentUser } = useSelector(store => store.currentUser)
    const { privacy, post, gifUrl, image } = useSelector(store => store.post)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [apiResponse, setApiResponse] = useState("")
    //Just for frontend review
    const [postImage, setPostImage] = useState("")
    const [textAreaBackground, setTextAreaBackground] = useState("#ffffff")
    const [disable, setDisable] = useState(false)
    const [selectedPostImage, setSelectedPostImage] = useState(null)
    const [selectedItem, setSelectedItem] = useState({
        topText: "Public",
        subText: "Anyone on page",
        icon: <FaGlobe className='globe-icon globe' />
    })
    const [postData, setPostData] = useState({
        post: "",
        bgColor: textAreaBackground,
        privacy: "",
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
    //Close post create modal if you want
    const closePostModal = () => {
        dispatch(closeModal())
        dispatch(clearPost())
    }
    //Post text content
    const counterRef = useRef(null)
    const inputRef = useRef(null)
    const inputImgRef = useRef(null)
    const postText = (e, textContent) => {
        const textLength = e.target.textContent.length
        const counter = 150 - textLength
        counterRef.current.textContent = `${counter}/150`
        handlePostText(textContent, postData, setPostData, setDisable)
    }
    const preventTextLength = (e) => {
        if (e.target.textContent.length === 150 && e.keyCode !== 8) {
            e.preventDefault()
        }
    }
    //Edit background
    const selectBackground = (bgColor) => {
        selectPostBackground(bgColor, postData, setTextAreaBackground, setPostData, setDisable)
    }

    //Edit privacy
    const displayPostPrivacy = useCallback(() => {
        if (privacy) {
            const postPrivacy = find(privacyList, (item) => item.topText === privacy)
            setSelectedItem(postPrivacy)
        }
    }, [privacy])

    useEffect(() => { displayPostPrivacy() }, [displayPostPrivacy])

    //Edit image
    const fileInputClicked = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        validateImageFile(file)
        setSelectedPostImage(file)
        //If there is post text don't delete it
        setTimeout(() => {
            if (inputImgRef?.current) {
                inputImgRef.current.textContent = !post ? postData.post : post
                if (post) {
                    postData.post = post
                }
                setPostData(postData)
            }
        }, 500)
        dispatch(updatePostItem({
            image: URL.createObjectURL(file),
            post,
            gifUrl: "",
            imgId: "",
            imgVersion: ""
        }))
    }

    useEffect(() => {
        if (gifUrl) {
            setPostImage(gifUrl)
        } else if (image) {
            setPostImage(image)
        }
    }, [gifUrl, image])

    //Clear Image

    const clearImage = () => {
        setPostData({ ...postData, image: "", gifUrl: "" })
        setSelectedPostImage(null)
        setPostImage("")
        //If there is post text don't delete it
        setTimeout(() => {
            if (inputRef?.current) {
                inputRef.current.textContent = !post ? postData.post : post
                if (post) {
                    postData.post = post
                }
                setPostData(postData)
            }
        }, 500)

        dispatch(updatePostItem({
            image: "",
            gifUrl: "",
            imgId: "",
            imgVersion: ""
        }))
    }
    console.log(postData)
    //CreatePost
    const createPost = async () => {
        setLoading(true)
        if (Object.keys(feeling).length) {
            postData.feelings = feeling?.name
        }
        postData.privacy = privacy || "Public"
        postData.gifUrl = gifUrl
        if (selectedPostImage) {
            let result = await readImageAsBase64(selectedPostImage)

            await sendPostWithImage(result, postData, inputImgRef, setApiResponse, setLoading, dispatch)

        } else {
            const res = await createPostNoImage(postData)
            if (res) {
                setLoading(false)
                toast.success("Post has been created successfully")
                closePostCreateModal(dispatch)
            }
        }
    }

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
                                <Spinner />
                            </div>)}
                        <div className='modal-box-header'>
                            <h2>Create Post</h2>
                            <button onClick={closePostModal} className='modal-box-header-cancel'>X</button>
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
                                                ref={(el) => {
                                                    inputRef.current = el
                                                    inputRef?.current?.focus()
                                                }}
                                                className={`editable flex-item ${textAreaBackground !== "#ffffff" ? "textInputColor" : ""}`}
                                                name="post"
                                                onKeyDown={preventTextLength}
                                                onInput={(e) => postText(e, e.currentTarget.textContent)}
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
                                        ref={(el) => {
                                            inputImgRef.current = el
                                            inputImgRef?.current?.focus()
                                        }}
                                        className='post-input flex-item'
                                        name="post"
                                        onKeyDown={preventTextLength}
                                        onInput={(e) => postText(e, e.currentTarget.textContent)}
                                        contentEditable={true}
                                        data-placeholder="Edit your post content..."
                                    ></div>
                                    <div className="image-display">
                                        <div className="image-delete-btn">
                                            <FaTimes
                                                onClick={clearImage} />
                                        </div>
                                        <img src={postImage} alt="" className="post-image" />
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
                        <span className='char_count' ref={counterRef}>100/100</span>
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
                                    <li onClick={() => dispatch(toggleGifModal(!gifModalIsOpen))} className="post-form-list-item">
                                        <img src={gif} alt="" /> Gif
                                    </li>
                                    <li className="post-form-list-item" onClick={() => setToggleFeelings(!toggleFeelings)}>
                                        <img src={feelingImg} alt="" /> Feeling
                                    </li>
                                </ul>
                            </div>
                        </>
                        <div className="modal-box-button">
                            <Button handleClick={createPost} label="Create Post" className="post-button" disabled={disable} />
                        </div>
                    </div>
                )}
                {gifModalIsOpen && (
                    <div className='modal-giphy'>
                        <div className='modal-giphy-header'>
                            <Button
                                label={<FaArrowLeft />}
                                className="back-button"
                                disabled={false}
                                handleClick={() => dispatch(toggleGifModal(!gifModalIsOpen))}
                            />
                            <h3>Choose a GIF</h3>
                        </div>
                        <hr />
                        <Giphy />
                    </div>
                )}
            </PostWrapper>
        </>
    )
}

export default AddPost
