import React, { useState } from 'react'
import "./forgotPassword.scss"
import { Input, Button } from '../../components'
import { FaArrowLeft } from "react-icons/fa"
import { Link } from 'react-router-dom'
import bgImage from "../../assets/images/background.jpg"
import { authService } from './../../services/api/auth.service';

const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [alertType, setAlertType] = useState("")
    const [responseMessage, setResponseMessage] = useState("")

    const handleForgotPwd = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await authService.forgotPassword(email)
            console.log(res.data);
            setLoading(false)
            setAlertType("alert-success")
            setResponseMessage(res?.data?.message)
        } catch (error) {
            setLoading(false)
            setAlertType("alert-error")
            setResponseMessage(error?.response?.data?.message)
        }
    }
    return (
        <div className="container-wrapper" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="environment">DEV</div>
            <div className="container-wrapper-auth">
                <div className="tabs forgot-password-tabs" style={{ height: responseMessage ? "320px" : "" }}>
                    <div className="tabs-auth">
                        <ul className="tab-group">
                            <li className="tab">
                                <div className="login forgot-password">Forgot Password</div>
                            </li>
                        </ul>

                        <div className="tab-item">
                            <div className="auth-inner">
                                {responseMessage && <div className={`alerts ${alertType}`} role="alert">
                                    {responseMessage}
                                </div>}
                                <form className="auth-form" onSubmit={handleForgotPwd}>
                                    <div className="form-input-container">
                                        <Input id="email" name="email" type="email" value={email} labelText="email" placeholder="Enter your email" handleChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <Button className="auth-button button" label={loading ? "On Progress" : "RESET PASSWORD"} disabled={!email} />

                                    <Link to="/">
                                        <span className="forgot-password">
                                            <FaArrowLeft className='arrow-right' /> Back to Login
                                        </span>
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
