import React from 'react'
import "./login.scss"
import { FaArrowRight } from "react-icons/fa"
import { Input, Button } from '../../components'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className="auth-inner">
            <div className="alerts alert-error" role="alert">
                Error message
            </div>
            <form className="auth-form">
                <div className="form-input-container">
                    <Input id="username" name="username" type="text" value="value" labelText="username" placeholder="Enter username" handleChange={() => { }} />
                    <Input id="password" name="password" type="password" value="value" labelText="password" placeholder="Enter password" handleChange={() => { }} />
                    <label className="checkmark-container" htmlFor="checkbox">
                        <Input id="checkbox" name="checkbox" type="checkbox" value={false} />
                        Keep me signed in
                    </label>
                </div>
                <Button className={"auth-button button"} label="LOGIN" disabled={false} />
                <Link to="/forgot_pwd">
                    <span className="forgot-password">
                        Forgot password? <FaArrowRight className='arrow-right' />
                    </span>
                </Link>
            </form>
        </div>
    )
}

export default Login
