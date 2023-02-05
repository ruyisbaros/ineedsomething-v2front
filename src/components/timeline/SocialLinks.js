import { updateUsersSocialLinks } from '@services/api/user.service';
import React from 'react'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import InfoDisplay from './InfoDisplay';
import BasicInfoSkeleton from './BasicInfoSkeleton';

const SocialLinks = ({ editableSocialInputs, username, profile, loading, setEditableSocialInputs }) => {
    const dispatch = useDispatch();
    const noBasicInfo = {
        quoteMsg: '',
        workMsg: '',
        schoolMsg: '',
        locationMsg: ''
    };
    const noSocialInfo = {
        instagramMsg: 'No link available',
        twitterMsg: 'No link available',
        facebookMsg: 'No link available',
        youtubeMsg: 'No link available'
    };
    const editableInputs = {
        quote: '',
        work: '',
        school: '',
        location: ''
    };
    const editableSocialLinks = editableSocialInputs ?? {
        instagram: '',
        twitter: '',
        facebook: '',
        youtube: ''
    };
    const basicInfoPlaceholder = {
        quotePlaceholder: '',
        workPlaceholder: '',
        schoolPlaceholder: '',
        locationPlaceholder: ''
    };
    const socialLinksPlaceholder = {
        instagramPlaceholder: 'Add your Instagram account link',
        twitterPlaceholder: 'Add your Twitter account link',
        facebookPlaceholder: 'Add your Facebook account link',
        youtubePlaceholder: 'Add your YouTube account link'
    };

    const updateSocialLinks = async () => {
        try {
            console.log(editableSocialInputs);
            const response = await updateUsersSocialLinks(editableSocialInputs);
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
                    title="Social Links"
                    type="social"
                    isCurrentUser={username === profile?.username}
                    noBasicInfo={noBasicInfo}
                    noSocialInfo={noSocialInfo}
                    basicInfoPlaceholder={basicInfoPlaceholder}
                    socialLinksPlaceholder={socialLinksPlaceholder}
                    editableInputs={editableInputs}
                    editableSocialInputs={editableSocialLinks}
                    loading={loading}
                    setEditableSocialInputs={setEditableSocialInputs}
                    updateInfo={updateSocialLinks}
                />
            )}
        </>
    )
}

export default SocialLinks
