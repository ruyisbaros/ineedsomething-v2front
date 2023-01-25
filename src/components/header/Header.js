import { useState, useEffect, useRef } from 'react';
import logo from '@assets/images/needsmtg.jpg';
import { FaCaretDown, FaCaretUp, FaRegBell, FaRegEnvelope } from 'react-icons/fa';
import { appEnvironment, clearCurrentUser, mapSettingsDropdownItems } from '@services/utils/util.service';
import Avatar from '@components/avatar/Avatar';
import '@components/header/header.scss';
import { useSelector, useDispatch } from 'react-redux';
import useDetectOutsideClick from '@hooks/useDetectOutsideClick';
import MessageSidebar from '@components/message-sidebar/MessageSidebar';
import Dropdown from '@components/dropdown/Dropdpwn';
import { useNavigate } from 'react-router-dom';
import { navigateOnProfiles } from '@services/api/user.service';
import useLocalStorage from '@hooks/useLocalStorage';
import useSessionStorage from '@hooks/useSessionStorage';
import { authService } from '@services/api/auth.service';

const Header = () => {
    const { currentUser } = useSelector(store => store.currentUser)
    //console.log(currentUser._doc.profilePicture)
    const [environment, setEnvironment] = useState("")
    const [settings, setSettings] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const messageRef = useRef(null)
    const notificationRef = useRef(null)
    const settingsRef = useRef(null)
    const [isMessageActive, setIsMessageActive] = useDetectOutsideClick(messageRef, false)
    const [isNotificationActive, setIsNotificationActive] = useDetectOutsideClick(notificationRef, false)
    const [isSettingsActive, setIsSettingsActive] = useDetectOutsideClick(settingsRef, false)
    const [deleteStoreUsername] = useLocalStorage("username", "delete")
    const [setLoggedMeIn] = useLocalStorage("keepLoggedIn", "set")
    const [deleteStoragePageReload] = useSessionStorage("pageReload", "delete")

    const bckgrndColor = `${environment === "DEV" ? "#50b5ff" : environment === "STG" ? "#e9710f" : ""}`

    useEffect(() => {
        const env = appEnvironment()
        setEnvironment(env)
    }, [])

    useEffect(() => {
        mapSettingsDropdownItems(setSettings)
    }, [])

    const openChatPage = () => {

    }

    const onMarkAsRead = () => { }
    const onDeleteNotification = () => { }
    const onLogout = async () => {
        try {
            clearCurrentUser({ dispatch, deleteStoreUsername, deleteStoragePageReload, setLoggedMeIn })
            await authService.logout()
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    const onNavigate = () => {
        navigateOnProfiles(currentUser, navigate)
    }

    return (
        <>
            <div className="header-nav-wrapper" data-testid="header-wrapper">
                {
                    isMessageActive &&
                    (
                        <div ref={messageRef}>
                            <MessageSidebar profile={currentUser} messageCount={0} openChatPage={openChatPage} messageNotifications={[]} />
                        </div>
                    )
                }
                <div className="header-navbar">
                    <div className="header-image" data-testid="header-image" onClick={() => navigate("/app/social/streams")}>
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
                        <li className="header-nav-item active-item"
                            onClick={() => {
                                setIsMessageActive(false)
                                setIsNotificationActive(true)
                                setIsSettingsActive(false)
                            }}>
                            <span className="header-list-name">
                                <FaRegBell className="header-list-icon" />
                                <span className="bg-danger-dots dots" data-testid="notification-dots">

                                </span>
                            </span>
                            {isNotificationActive &&
                                (
                                    <ul className="dropdown-ul" ref={notificationRef}>
                                        <li className="dropdown-li">
                                        <Dropdown
                                            height={300}
                                            style={{ right: "250px", top: "20px" }}
                                            data={[]}
                                            notificationCount={0}
                                            title="Notifications"
                                            onMarkAsRead={onMarkAsRead}
                                            onDeleteNotification={onDeleteNotification}
                                        />
                                    </li>
                                </ul>

                                )
                            }
                            &nbsp;
                        </li>
                        <li className="header-nav-item active-item"
                            onClick={() => {
                                setIsMessageActive(true)
                                setIsNotificationActive(false)
                                setIsSettingsActive(false)
                            }}>
                            <span className="header-list-name">
                                <FaRegEnvelope className="header-list-icon" />
                                <span className="bg-danger-dots dots" data-testid="messages-dots"></span>
                            </span>
                            &nbsp;
                        </li>
                        <li className="header-nav-item" onClick={() => {
                            setIsSettingsActive(!isSettingsActive)
                            setIsMessageActive(false)
                            setIsNotificationActive(false)
                        }}>
                            <span className="header-list-name profile-image">
                                <Avatar
                                    name={currentUser?.username}
                                    bgColor={currentUser?.avatarColor}
                                    textColor="#fff"
                                    size={40}
                                    avatarSource={currentUser?.profilePicture}
                                />
                            </span>
                            <span className="header-list-name profile-name">
                                {currentUser?.username}
                                {!isSettingsActive ? <FaCaretDown className="header-list-icon caret" /> : <FaCaretUp className="header-list-icon caret" />}
                            </span>
                            {
                                isSettingsActive && <ul className="dropdown-ul" ref={settingsRef}>
                                    <li className="dropdown-li">
                                        <Dropdown
                                            height={300}
                                            style={{ right: "140px", top: "30px" }}
                                            data={settings}
                                            notificationCount={0}
                                            title="Settings"
                                            onLogout={onLogout}
                                            onNavigate={onNavigate}
                                        />
                                    </li>
                                </ul>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
export default Header;
