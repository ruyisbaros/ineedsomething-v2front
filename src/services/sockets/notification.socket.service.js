import { markNotificationAsRead } from '@services/api/notification.service';
import { socketService } from '@services/sockets/socket.service';
import { cloneDeep, find, findIndex, remove } from 'lodash';


export function socketIONotification(profile, notifications, setNotifications, type, setNotificationsCount) {
    socketService?.socket?.on("insert notification", (data, userToData) => {
        if (profile._id === userToData.userTo) {
            notifications = [...data]
            if (type === "notificationPage") {
                setNotifications(notifications)
                //setNotificationsCount(notifications.length)
            }
        }
    })

    socketService?.socket?.on("update notification", (id) => {
        notifications = cloneDeep(notifications)
        const notificationData = find(notifications, (not) => not._id === id)
        if (!notificationData) return;
        const index = findIndex(notifications, (not) => not._id === id)
        notificationData.read = true
        notifications.splice(index, 1, notificationData)
        if (type === "notificationPage") {
            setNotifications(notifications)
        }
    })

    socketService?.socket?.on("delete notification", (id) => {
        notifications = cloneDeep(notifications)
        remove(notifications, { _id: id })
        if (type === "notificationPage") {
            setNotifications(notifications)
            //setNotificationsCount(notifications.length)
        }
    })
}

export async function markMessageAsRead(id) {
    await markNotificationAsRead(id)
}