import React from 'react'
import { Button } from '@components/index'
import { useNavigate } from 'react-router-dom'
import "./error.scss"

const Error = () => {
    const navigate = useNavigate()
    return (
        <div className="error-container">
            <div className="oops">Oops!</div>
            <p className="not-found">Error 404: Page Not Found!</p>
            <Button className="back-button button" label="Back Home" handleClick={() => navigate(-1)} />
        </div>
    )
}

export default Error