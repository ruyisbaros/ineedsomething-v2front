import React, { useState } from 'react'
import "./auth.scss"
import bgImage from "../../assets/images/background.jpg"
import Login from './Login';
import Register from './Register';

const Auth = () => {

    const [type, setType] = useState("login")

    return (
        <>
            <div className="container-wrapper" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="environment">DEV</div>
                <div className="container-wrapper-auth">
                    <div className="tabs">
                        <div className="tabs-auth">
                            <ul className="tab-group">
                                <li className={type === "login" ? "tab active" : "tab"} onClick={() => setType("login")}>
                                    <button className="login">Login</button>
                                </li>
                                <li className={type === "register" ? "tab active" : "tab"} onClick={() => setType("register")}>
                                    <button className="signup">Register</button>
                                </li>
                            </ul>
                            {
                                type === "login" && <div className="tab-item"><Login /></div>
                            }
                            {
                                type === "register" && <div className="tab-item"><Register /></div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth