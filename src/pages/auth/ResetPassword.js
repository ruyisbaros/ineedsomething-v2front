import React, { useState } from 'react'
import bgImage from "../../assets/images/background.jpg"
import { Input, Button } from '../../components'
import { FaArrowLeft } from "react-icons/fa"
import { Link } from 'react-router-dom'
import "./resetPassword.scss"
import { authService } from './../../services/api/auth.service';

const ResetPassword = () => {
    const [responseMessage, setResponseMessage] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [alertType, setAlertType] = useState("")

    const handleResetPwd = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await authService.resetPassword(password)
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
                <div className="tabs reset-password-tabs" style={{ height: `${responseMessage ? '400px' : ''}` }}>
                    <div className="tabs-auth">
                        <ul className="tab-group">
                            <li className="tab">
                                <div className="login reset-password">Reset Password</div>
                            </li>
                        </ul>
                        <div className="tab-item">
                            <div className="auth-inner">
                                {responseMessage && <div className={`alerts ${alertType}`} role="alert">
                                    {responseMessage}
                                </div>}
                                <form className="reset-password-form" onSubmit={handleResetPwd}>
                                    <div className="form-input-container">
                                        <Input id="password" name="password" type="password" value={password}
                                            labelText="New Password" placeholder="New Password" handleChange={() => { }}
                                        />
                                        <Input id="cpassword" name="cpassword" type="password" value={confirmPassword}
                                            labelText="Confirm Password" placeholder="Confirm Password" handleChange={() => { }}
                                        />
                                    </div>
                                    <Button label="RESET PASSWORD" className="auth-button button" disabled={false} />

                                    <Link to={'/'}>
                                        <span className="login">
                                            <FaArrowLeft className="arrow-left" /> Back to Login
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

export default ResetPassword