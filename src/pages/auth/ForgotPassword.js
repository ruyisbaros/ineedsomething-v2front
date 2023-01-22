import React from 'react'
import "./forgotPassword.scss"
import { Input, Button } from '../../components'
import { FaArrowLeft } from "react-icons/fa"
import { Link } from 'react-router-dom'
import bgImage from "../../assets/images/background.jpg"

const ForgotPassword = () => {
    return (
        <div className="container-wrapper" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="environment">DEV</div>
            <div className="container-wrapper-auth">
                <div className="tabs forgot-password-tabs">
                    <div className="tabs-auth">
                        <ul className="tab-group">
                            <li className="tab">
                                <div className="login forgot-password">Forgot Password</div>
                            </li>
                        </ul>

                        <div className="tab-item">
                            <div className="auth-inner">
                                <div className="alerts alert-error" role="alert">
                                    Error message
                                </div>
                                <form className="auth-form">
                                    <div className="form-input-container">
                                        <Input id="email" name="email" type="email" value="value" labelText="email" placeholder="Enter your email" handleChange={() => { }} />
                                    </div>
                                    <Button className="auth-button button" label="RESET PASSWORD" disabled={false} />

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
