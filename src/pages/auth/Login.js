import React, { useState, useEffect } from 'react'
import "./login.scss"
import { FaArrowRight } from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import useLocalStorage from '@hooks/useLocalStorage'
import { Button, Input } from '@components/index';
import { authService } from '@services/api/auth.service'
import { dispatchCurrentUser } from '@services/utils/util.service';
import useSessionStorage from '@hooks/useSessionStorage';

const Login = () => {
    const [logUser, setLogUser] = useState({ username: "", password: "" })
    const { username, password } = logUser
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [alertType, setAlertType] = useState("")
    const [hasError, setHasError] = useState(false)
    const [keepLoggedIn, setKeepLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [setStoredUsername] = useLocalStorage("username", "set")
    const [setLoggedMeIn] = useLocalStorage("keepLoggedIn", "set")
    const [pageReload] = useSessionStorage("pageReload", "set")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (loading && !currentUser) return;
        if (currentUser) {
            setLoading(false)
            navigate("/app/social/streams")
        }
    }, [loading, currentUser, navigate])

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
            setStoredUsername(username)
            setLoggedMeIn(keepLoggedIn)
            setAlertType("alert-success")
            setHasError(false)
            await dispatchCurrentUser(pageReload, dispatch, setCurrentUser)
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
                        <input id="checkbox" name="checkbox" type="checkbox" checked={keepLoggedIn} onChange={() => setKeepLoggedIn(!keepLoggedIn)} />
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
