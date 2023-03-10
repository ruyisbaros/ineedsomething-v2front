import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@components/avatar/Avatar'
import { FaCircle, FaRegCircle, FaRegTrashAlt } from 'react-icons/fa'
import "./notifications.scss"
import { deleteUserNotifications, getUserNotifications } from '@services/api/notification.service'
import { dispatchNotifications, generateString } from '@services/utils/util.service';
import { markMessageAsRead, socketIONotification } from '@services/sockets/notification.socket.service'
import NotificationPreview from '@components/dialog/NotificationPreview'

const Notifications = () => {
    const { currentUser } = useSelector(store => store.currentUser)
    const [notifications, setNotifications] = useState([])
    const [dialogContent, setDialogContent] = useState({
        post: "",
        imgUrl: "",
        comment: "",
        reaction: "",
        senderName: ""
    })
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUserNotifications = async () => {
            try {
                const res = await getUserNotifications()
                console.log(res.data);
                setNotifications(res.data.notifications)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                dispatchNotifications(error.response.data.message, "error", dispatch)
            }
        }

        fetchUserNotifications()
    }, [dispatch])

    useEffect(() => {
        socketIONotification(currentUser, notifications, setNotifications, "notificationPage")
    }, [currentUser, notifications])

    const markAsRead = async (notification) => {
        try {
            await markMessageAsRead(notification._id, notification, setDialogContent)
        } catch (error) {
            dispatchNotifications(error.response.data.message, "error", dispatch)
        }
    }

    const deleteNot = async (e, id) => {
        e.stopPropagation()
        try {
            const res = await deleteUserNotifications(id)
            dispatchNotifications(res.data.message, "success", dispatch)
        } catch (error) {
            dispatchNotifications(error.response.data.message, "error", dispatch)
        }
    }

    return (
        <>
            {dialogContent?.senderName && (
                <NotificationPreview
                    title="My Post"
                    post={dialogContent?.post}
                    imgUrl={dialogContent?.imgUrl}
                    comment={dialogContent?.comment}
                    reaction={dialogContent?.reaction}
                    senderName={dialogContent?.senderName}
                    secondButtonText="Close"
                    secondBtnHandler={() => {
                        setDialogContent({
                            post: "",
                            imgUrl: "",
                            comment: "",
                            reaction: "",
                            senderName: ""
                        })
                    }}
                />
            )}
            <div className="notifications-container">
                <div className="notifications">Notifications</div>
                {notifications.length > 0 && (
                    <div className="notifications-box">
                        {notifications?.map((notification, index) => (
                            <div className="notification-box"
                                key={generateString(10)}
                                onClick={() => markAsRead(notification)}>
                                <div className="notification-box-sub-card">
                                    <div className="notification-box-sub-card-media">
                                        <div className="notification-box-sub-card-media-image-icon">
                                            <Avatar name={notification?.userFrom?.username} bgColor={notification?.userFrom?.avatarColor}
                                                textColor="#ffffff" size={40} avatarSrc={notification?.userFrom?.profilePicture} />
                                        </div>
                                        <div className="notification-box-sub-card-media-body">
                                            <h6 className="title">
                                                {notification?.message}
                                                <small data-testid="subtitle" className="subtitle"
                                                    onClick={(e) => deleteNot(e, notification._id)}>
                                                    <FaRegTrashAlt className="trash" />
                                                </small>
                                            </h6>
                                            <div className="subtitle-body">
                                                <small className="subtitle">
                                                    {!notification?.read ?
                                                        <FaCircle className="icon" /> :
                                                        <FaRegCircle className="icon" />}
                                                </small>
                                                <p className="subtext">1 hr ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {loading && !notifications.length && <div className="notifications-box"></div>}
                {!loading && !notifications.length && <h3 className="empty-page" data-testid="empty-page">
                    You have no notification
                </h3>}
            </div>
        </>
    )
}

export default Notifications