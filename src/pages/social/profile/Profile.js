import React, { useState, useCallback, useEffect } from 'react'
import BackgroundHeader from '@components/background-header/BackgroundHeader'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getImage, renameFile } from '@services/utils/util.service';
import { getUserByUsername } from '@services/api/user.service';
import { tabItems } from './../../../services/utils/static.data';
import { filter } from 'lodash';
import { toggleDeleteDialog } from '@redux/postModalSlicer';
import { imageService } from '@services/api/image.service';
import Timeline from '@components/timeline/Timeline';
import FollowerCard from './../followers/FollowerCard';
import GalleryImage from '@components/image/image-gallery/GalleryImage';
import ChangePassword from '@components/change-password/ChangePassword';
import NotificationSettings from '@components/notification-settings/NotificationSettings';
import ImageModal from '@components/image/image-modal/ImageModal';
import Dialog from '@components/dialog/Dialog';
import "./profile.scss"


const Profile = () => {
    const { currentUser } = useSelector(store => store.currentUser)
    const { deleteDialogIsOpen, data } = useSelector((state) => state.modal);
    const [user, setUser] = useState();
    const [rendered, setRendered] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [hasImage, setHasImage] = useState(false);
    const [selectedBackgroundImage, setSelectedBackgroundImage] = useState('');
    const [selectedProfileImage, setSelectedProfileImage] = useState('');
    const [bgUrl, setBgUrl] = useState('');
    const [galleryImages, setGalleryImages] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [displayContent, setDisplayContent] = useState('timeline');
    const [loading, setLoading] = useState(true);
    const [showImageModal, setShowImageModal] = useState(false);
    const [userProfileData, setUserProfileData] = useState(null);
    const dispatch = useDispatch();
    const { username } = useParams();
    const [searchParams] = useSearchParams();
    //console.log(username);

    const changeTabContent = (data) => {
        setDisplayContent(data);
    };

    const selectedFileImage = (data, type) => {
        setHasImage(!hasImage);
        if (type === 'background') {
            setSelectedBackgroundImage(data);
        } else {
            setSelectedProfileImage(data);
        }
    };

    const cancelFileSelection = () => {
        setHasImage(!hasImage);
        setSelectedBackgroundImage('');
        setSelectedProfileImage('');
        setHasError(false);
    };

    const getUserProfileByUsername = useCallback(async () => {
        try {
            const response = await getUserByUsername(
                searchParams.get('id'),
                username,
                searchParams.get('uId')
            );
            setUser(response.data.user);
            setUserProfileData(response.data);
            setBgUrl(getImage(response.data.user?.bgImageId, response.data.user?.bgImageVersion));
            setLoading(false);
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }, [searchParams, username]);

    const getUserImages = useCallback(async () => {
        try {
            const imagesResponse = await imageService.getUserImages(searchParams.get('id'));
            setGalleryImages(imagesResponse.data.images);
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }, [searchParams]);

    const saveImage = (type) => {
        const reader = new FileReader();
        reader.addEventListener('load', async () => addImage(reader.result, type), false);

        if (selectedBackgroundImage && typeof selectedBackgroundImage !== 'string') {
            reader.readAsDataURL(selectedBackgroundImage);
        } else if (selectedProfileImage && typeof selectedProfileImage !== 'string') {
            reader.readAsDataURL(selectedProfileImage);
        } else {
            addImage(selectedBackgroundImage, type);
        }
    };

    const addImage = async (result, type) => {
        try {
            const url = type === 'background' ? '/images/bg_img' : '/images/profile_img';
            const response = await imageService.addImage(url, result);
            if (response) {
                toast.success(response.data.message);
                setHasError(false);
                setHasImage(false);
            }
        } catch (error) {
            setHasError(true);
            toast.error(error?.response?.data?.message)
        }
    };

    const removeBackgroundImage = async (bgImageId) => {
        try {
            setBgUrl('');
            await removeImage(`/images/delete_bg/${bgImageId}`);
        } catch (error) {
            setHasError(true);
            toast.error(error?.response?.data?.message)
        }
    };

    const removeImageFromGallery = async (imageId) => {
        try {
            dispatch(toggleDeleteDialog({ toggle: false, data: null }));
            const images = filter(galleryImages, (image) => image._id !== imageId);
            setGalleryImages(images);
            await removeImage(`/images/${imageId}`);
        } catch (error) {
            setHasError(true);
            toast.error(error?.response?.data?.message)
        }
    };

    const removeImage = async (url) => {
        const response = await imageService.removeImage(url);
        toast.success(response.data.message);
    };

    useEffect(() => {
        if (rendered) {
            getUserProfileByUsername();
            getUserImages();
        }
        if (!rendered) setRendered(true);
    }, [rendered, getUserProfileByUsername, getUserImages]);

    useEffect(() => {
        console.log(displayContent)
    }, [displayContent])
    return (
        <>
            {showImageModal && (
                <ImageModal image={imageUrl}
                    onCancel={() => setShowImageModal(false)}
                    showArrow={false}
                />
            )}
            {deleteDialogIsOpen && (
                <Dialog
                    title="Are you sure you want to delete this image?"
                    showButtons={true}
                    firstButtonText="Delete"
                    secondButtonText="Cancel"
                    firstBtnHandler={() => removeImageFromGallery(data)}
                    secondBtnHandler={() => dispatch(toggleDeleteDialog({ toggle: false, data: null }))}
                />
            )}
            <div className='profile-wrapper'>
                <div className="profile-wrapper-container">
                    <div className="profile-header">
                        <BackgroundHeader
                            user={user}
                            loading={loading}
                            hasImage={hasImage}
                            hasError={hasError}
                            url={bgUrl}
                            onClick={changeTabContent}
                            selectedFileImage={selectedFileImage}
                            saveImage={saveImage}
                            cancelFileSelection={cancelFileSelection}
                            removeBackgroundImage={removeBackgroundImage}
                            tabItems={tabItems(username === currentUser?.username, username === currentUser?.username)}
                            tab={displayContent}
                            hideSettings={username === currentUser?.username}
                            galleryImages={galleryImages}
                        />
                    </div>
                    <div className="profile-content">
                        {displayContent === "timeline" && <Timeline userProfileData={userProfileData} loading={loading} />}
                        {displayContent === "followers" && <FollowerCard userData={user} />}
                        {displayContent === "gallery" && (
                            <>
                                {galleryImages.length > 0 && (
                                    <>
                                        <div className='imageGrid-container'>
                                            {
                                                galleryImages.map(image => (
                                                    <div key={image._id}>
                                                        <GalleryImage
                                                            showCaption={false}
                                                            showDelete={true}
                                                            imgSrc={getImage(image.imgId, image.imgVersion)}
                                                            onClick={() => {
                                                                setImageUrl(getImage(image.imgId, image.imgVersion))
                                                                setShowImageModal(!showImageModal)
                                                            }}
                                                            onRemoveImage={(e) => {
                                                                e.stopPropagation()
                                                                dispatch(toggleDeleteDialog({ toggle: !deleteDialogIsOpen, data: image._id }))
                                                            }}
                                                        />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                        {displayContent === "change password" && <ChangePassword />}
                        {displayContent === "notifications" && <NotificationSettings />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile