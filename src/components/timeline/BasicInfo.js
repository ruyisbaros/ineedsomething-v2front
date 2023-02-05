import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./timeline.scss"
import { toast } from 'react-toastify';
import { updateUsersBasicInfo } from '@services/api/user.service';
import BasicInfoSkeleton from './BasicInfoSkeleton';
import InfoDisplay from './InfoDisplay';

const BasicInfo = ({ editableInputs, username, profile, loading, setEditableInputs }) => {
    const { currentUser } = useSelector(store => store.currentUser)
    const dispatch = useDispatch();
    const noBasicInfo = {
        quoteMsg: 'No information',
        workMsg: 'No information',
        schoolMsg: 'No information',
        locationMsg: 'No information'
    };
    const noSocialInfo = {
        instagramMsg: '',
        twitterMsg: '',
        facebookMsg: '',
        youtubeMsg: ''
    };
    const editableSocialInputs = {
        instagram: '',
        twitter: '',
        facebook: '',
        youtube: ''
    };
    const basicInfoPlaceholder = {
        quotePlaceholder: 'Add your quote',
        workPlaceholder: 'Add company name',
        schoolPlaceholder: 'Add school name',
        locationPlaceholder: 'Add city and country names'
    };
    const socialLinksPlaceholder = {
        instagramPlaceholder: '',
        twitterPlaceholder: '',
        facebookPlaceholder: '',
        youtubePlaceholder: ''
    };

    const updateBasicInfo = async () => {
        try {
            const response = await updateUsersBasicInfo(editableInputs);
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };
    return (
        <>
            {loading ? (
                <BasicInfoSkeleton />
            ) : (
                <InfoDisplay
                    title="Basic Info"
                    type="basic"
                    isCurrentUser={username === currentUser?.username}
                    noBasicInfo={noBasicInfo}
                    noSocialInfo={noSocialInfo}
                    basicInfoPlaceholder={basicInfoPlaceholder}
                    socialLinksPlaceholder={socialLinksPlaceholder}
                    editableInputs={editableInputs}
                    editableSocialInputs={editableSocialInputs}
                    loading={loading}
                    setEditableInputs={setEditableInputs}
                    updateInfo={updateBasicInfo}
                />
            )}
        </>
    )
}

export default BasicInfo