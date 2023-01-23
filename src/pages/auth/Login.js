import React, { useState, useEffect } from 'react'
import "./login.scss"
import { FaArrowRight } from "react-icons/fa"
import { Input, Button } from '../../components'
import { Link } from 'react-router-dom'
import { authService } from './../../services/api/auth.service';

const Login = () => {
    const [logUser, setLogUser] = useState({ username: "", password: "" })
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [alertType, setAlertType] = useState("")
    const [hasError, setHasError] = useState(false)
    const [keepLoggedIn, setKeepLoggedIn] = useState(false)
    const { username, password } = logUser

    // console.log(keepLoggedIn);
    const handleChange = (e) => {
        const { name, value } = e.target
        setLogUser({ ...logUser, [name]: value })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await authService.login(logUser)
            console.log(res.data);
            setLoading(false)
            setAlertType("alert-success")
            setHasError(false)
        } catch (error) {
            setLoading(false)
            setAlertType("alert-error")
            setHasError(true)
            setErrorMessage(error?.response?.data?.message)
        }
    }
    return (
        <div className="auth-inner">
            {hasError && errorMessage && <div className={`alerts ${alertType}`} role="alert">
                {errorMessage}
            </div>}
            <form className="auth-form" onSubmit={handleLogin}>
                <div className="form-input-container">
                    <Input style={{ border: hasError ? "1px solid #fa9b8a" : "" }}
                        id="username" name="username" type="text" value={username} labelText="username" placeholder="Enter username" handleChange={handleChange} />
                    <Input style={{ border: hasError ? "1px solid #fa9b8a" : "" }}
                        id="password" name="password" type="password" value={password} labelText="password" placeholder="Enter password" handleChange={handleChange} />
                    <label className="checkmark-container" htmlFor="checkbox">
                        <Input id="checkbox" name="checkbox" type="checkbox" value={keepLoggedIn} onChange={() => setKeepLoggedIn(!keepLoggedIn)} />
                        Keep me signed in
                    </label>
                </div>
                <Button className="auth-button button" label={loading ? "Login in Progress" : "LOGIN"} disabled={!username || !password} />
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
