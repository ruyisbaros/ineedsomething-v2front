import React from 'react'

const ReactionWrapper = ({ children, closeModal }) => {
    return (
        <>
            <div className="modal-wrapper" data-testid="modal-wrapper">
                <div className="modal-wrapper-container">
                    <div className="modal-wrapper-container-header">
                        {children[0]}
                        <button onClick={closeModal}>X</button>
                    </div>
                    <hr />
                    <div className="modal-wrapper-container-body" data-testid="modal-body">
                        {children[1]}
                    </div>
                </div>
                <div className="modal-bg" data-testid="modal-bg"></div>
            </div>
        </>
    )
}

export default ReactionWrapper