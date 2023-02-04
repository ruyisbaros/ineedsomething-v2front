import React from 'react'
import ReactionWrapper from './../posts/reaction-wrapper/ReactionWrapper';
import { getImage } from '@services/utils/util.service';

import "./imageGridModal.scss"

const ImageGridModal = ({ images, closeModal, selectedImage }) => {
    return (
        <ReactionWrapper closeModal={closeModal}>
            <div className="modal-image-header">
                <h2>Select Photo</h2>
            </div>
            <div className="modal-image-container">
                {images.map((data, index) => (
                    <img
                        key={index}
                        className="grid-image"
                        alt=""
                        src={`${getImage(data?.imgId, data?.imgVersion)}`}
                        onClick={() => {
                            selectedImage(getImage(data?.imgId, data?.imgVersion));
                            closeModal();
                        }}
                    />
                ))}
            </div>
        </ReactionWrapper>
    )
}

export default ImageGridModal
