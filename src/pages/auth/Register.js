import React from 'react'
import "./register.scss"
import { Input, Button } from '../../components'

const Register = () => {
    return (
        <div className="auth-inner">
            <div className="alerts alert-error" role="alert">
                Error message
            </div>
            <form className="auth-form">
                <div className="form-input-container">
                    <Input id="username" name="username" type="text" value="value" labelText="username" placeholder="Enter username" handleChange={() => { }} />
                    <Input id="email" name="email" type="email" value="" labelText="email" placeholder="yourmail@xyz.com" handleChange={() => { }} />
                    <Input id="password" name="password" type="password" value="value" labelText="password" placeholder="Enter password" handleChange={() => { }} />

                </div>
                <Button className={"auth-button button"} label="REGISTER" disabled={false} />


            </form>
        </div>
    )
}

export default Register
