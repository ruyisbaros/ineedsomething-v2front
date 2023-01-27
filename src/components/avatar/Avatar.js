import React from 'react'
import "./avatar.scss"

const Avatar = ({ avatarSrc, name, bgColor = "#f33e58", textColor, size, round = true }) => {

    const textSizeRatio = 1.7
    const fontSize = Math.floor(size / textSizeRatio)
    const firstChar = name?.charAt(0)

    return (
        <>
            {
                !avatarSrc && (
                    <div className="avatar-container"
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            borderRadius: `${round ? '50%' : ''}`,
                            backgroundColor: `${!avatarSrc ? bgColor : ''}`,
                            display: 'flex'
                        }}
                    >
                        {
                            name && (
                                <div
                                    style={{
                                        color: `${textColor}`,
                                        fontSize: `${fontSize}`,
                                        margin: 'auto',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase'
                                    }}
                                >{firstChar}</div>
                            )
                        }
                    </div>
                )}
            {
                avatarSrc && (
                    <img src={avatarSrc} alt="" className="avatar-container avatar-content"
                        style={{
                            width: `${size}px`, height: `${size}px`, borderRadius: `${round ? '50%' : ''}`
                        }}
                    />
                )
            }
        </>
    )
}

export default Avatar