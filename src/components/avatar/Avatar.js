import React from 'react'
import "@components/avatar/avatar.scss"

const Avatar = ({ avatarSource, name, bgColor = "#f33e58", textColor, size, round = true }) => {

    const textSizeRatio = 1.7
    const fontSize = Math.floor(size / textSizeRatio)
    const firstChar = name?.charAt(0)

    return (
        <>
            {
                !avatarSource && (
                    <div className="avatar-container"
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            borderRadius: `${round ? '50%' : ''}`,
                            backgroundColor: `${!avatarSource ? bgColor : ''}`,
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
                avatarSource && (
                    <img src={avatarSource} alt="" className="avatar-container avatar-content"
                        style={{
                            with: `${size}px`, height: `${size}px`, borderRadius: `${round ? '50%' : ''}`
                        }}
                    />
                )
            }
        </>
    )
}

export default Avatar