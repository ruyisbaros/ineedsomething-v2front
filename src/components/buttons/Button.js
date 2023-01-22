import React from 'react'

const Button = ({ label, className, disabled, handleClick }) => {
    return (
        <div>
            <button className={className} onClick={handleClick} disabled={disabled}>
                {label}
            </button>
        </div>
    )
}

export default Button