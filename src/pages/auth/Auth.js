import React, { useState, useEffect } from 'react'
import "./auth.scss"
import bgImage from "../../assets/images/background.jpg"
import Login from './Login';
import Register from './Register';
import useLocalStorage from '@hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { appEnvironment } from '@services/utils/util.service';



const Auth = () => {

    const [type, setType] = useState("login")
    const keepLoggedIn = useLocalStorage("keepLoggedIn", "get")
    const [environment, setEnvironment] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const env = appEnvironment()
        setEnvironment(env)
        if (keepLoggedIn) navigate("/app/social/streams")
    }, [keepLoggedIn, navigate])

    return (
        <>
            <div className="container-wrapper" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="environment">{environment}</div>
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