import React, { useState, useEffect } from 'react'
import "./register.scss"
import { Input, Button } from '../../components'
import { authService } from './../../services/api/auth.service';
import { createAvatarColor, generateAvatar } from './../../services/utils/util.service';

const Register = () => {
    const [newUser, setNewUser] = useState({ username: "", email: "", password: "" })
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [alertType, setAlertType] = useState("")
    const [hasError, setHasError] = useState(false)
    const { username, email, password } = newUser
    //console.log(hasError)
    const handleChange = (e) => {
        const { name, value } = e.target
        setNewUser({ ...newUser, [name]: value })
    }

    //console.log(newUser);
    const registerUser = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const avatarColor = createAvatarColor()
            const avatarImage = generateAvatar(username.charAt(0).toUpperCase(), avatarColor)
            const res = await authService.register({ ...newUser, avatarColor, avatarImage })
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
            <form className="auth-form" onSubmit={registerUser}>
                <div className="form-input-container">
                    <Input style={{ border: hasError ? "1px solid #fa9b8a" : "" }}
                        id="username" name="username" type="text" value={username} labelText="username" placeholder="Enter username" handleChange={handleChange} />
                    <Input style={{ border: hasError ? "1px solid #fa9b8a" : "" }}
                        id="email" name="email" type="email" value={email} labelText="email" placeholder="yourmail@xyz.com" handleChange={handleChange} />
                    <Input style={{ border: hasError ? "1px solid #fa9b8a" : "" }}
                        id="password" name="password" type="password" value={password} labelText="password" placeholder="Enter password" handleChange={handleChange} />

                </div>
                <Button className="auth-button button" label={loading ? "Register in Progress" : "REGISTER"} disabled={!username || !email || !password} />


            </form>
        </div>
    )
}

export default Register
