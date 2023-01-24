import { useState, useEffect } from 'react';
import logo from '@assets/images/needsmtg.jpg';
import { FaCaretDown, FaRegBell, FaRegEnvelope } from 'react-icons/fa';
import { appEnvironment } from '@services/utils/util.service';
import Avatar from '@components/avatar/Avatar';
import '@components/header/header.scss';

const Header = () => {
    const [environment, setEnvironment] = useState("")

    const bckgrndColor = `${environment === "DEV" ? "#50b5ff" : environment === "STG" ? "#e9710f" : ""}`

    useEffect(() => {
        const env = appEnvironment()
        setEnvironment(env)
    }, [])

    return (
        <>
            <div className="header-nav-wrapper" data-testid="header-wrapper">
                <div className="header-navbar">
                    <div className="header-image" data-testid="header-image">
                        <img src={logo} className="img-fluid" alt="" />
                        <div className="app-name">
                            iNeedSomething
                            {environment && (
                                <span className="environment" style={{ backgroundColor: `${bckgrndColor}` }}>{environment}</span>
                            )}
                        </div>
                    </div>
                    <div className="header-menu-toggle">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                    <ul className="header-nav">
                        <li className="header-nav-item active-item">
                            <span className="header-list-name">
                                <FaRegBell className="header-list-icon" />
                                <span className="bg-danger-dots dots" data-testid="notification-dots">

                                </span>
                            </span>
                            <ul className="dropdown-ul">
                                <li className="dropdown-li">

                                </li>
                            </ul>
                            &nbsp;
                        </li>
                        <li className="header-nav-item active-item">
                            <span className="header-list-name">
                                <FaRegEnvelope className="header-list-icon" />
                                <span className="bg-danger-dots dots" data-testid="messages-dots"></span>
                            </span>
                            &nbsp;
                        </li>
                        <li className="header-nav-item">
                            <span className="header-list-name profile-image">
                                <Avatar
                                    name="ahmet"
                                    bgColor='red'
                                    textColor="#fff"
                                    size={40}
                                    avatarSource=""
                                />
                            </span>
                            <span className="header-list-name profile-name">
                                Ahmet
                                <FaCaretDown className="header-list-icon caret" />
                            </span>
                            <ul className="dropdown-ul">
                                <li className="dropdown-li">

                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
export default Header;
