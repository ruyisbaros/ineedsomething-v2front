import { markNotificationAsRead } from '@services/api/notification.service';
import { socketService } from '@services/sockets/socket.service';
import { appImageUrl } from '@services/utils/util.service';
import { cloneDeep, find, findIndex, remove, sumBy } from 'lodash';
import moment from 'moment';

/* {moment(blog.createdAt).format("MMMM Do YYYY")} */

export function socketIONotification(profile, notifications, setNotifications, type, setNotificationsCount) {
    socketService?.socket?.on("insert notification", (data, userToData) => {
        if (profile._id === userToData.userTo) {
            notifications = [...data]
            if (type === "notificationPage") {
                setNotifications(notifications)
            } else {
                const mappedNots = mapDropdownNotifications(notifications, setNotificationsCount)
                setNotifications(mappedNots)
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
        } else {
            const mappedNots = mapDropdownNotifications(notifications, setNotificationsCount)
            setNotifications(mappedNots)
        }
    })

    socketService?.socket?.on("delete notification", (id) => {
        notifications = cloneDeep(notifications)
        remove(notifications, { _id: id })
        if (type === "notificationPage") {
            setNotifications(notifications)

        } else {
            const mappedNots = mapDropdownNotifications(notifications, setNotificationsCount)
            setNotifications(mappedNots)
        }
    })
}

export function mapDropdownNotifications(notificationData, setNotificationsCount) {
    const items = []
    for (const notification of notificationData) {
        const item = {
            _id: notification?._id,
            topText: notification?.topText ? notification?.topText : notification?.message,
            subText: moment(notification?.createdAt).fromNow(),
            createdAt: notification?.createdAt,
            username: notification?.userFrom ? notification?.userFrom.username : notification?.username,
            avatarColor: notification?.userFrom ? notification?.userFrom.avatarColor : notification?.avatarColor,
            profilePicture: notification?.userFrom ? notification?.userFrom.profilePicture : notification?.profilePicture,
            read: notification?.read,
            post: notification?.post,
            imgUrl: notification?.imgId
                ? appImageUrl(notification?.imgVersion, notification?.imgId)
                : notification?.gifUrl
                    ? notification?.gifUrl
                    : notification?.imgUrl,
            comment: notification?.comment,
            reaction: notification?.reaction,
            senderName: notification?.userFrom ? notification?.userFrom.username : notification?.username,
            notificationType: notification?.notificationType
        };
        items.push(item);
    }

    const count = sumBy(items, (not) => !not.read ? 1 : 0)
    setNotificationsCount(count)
    return items
}

export async function markMessageAsRead(id, notification, setDialogContent) {

    if (notification.notificationType !== "follows") {
        const notDialog = {
            createdAt: notification?.createdAt,
            post: notification?.post,
            imgUrl: notification?.imgId
                ? appImageUrl(notification?.imgVersion, notification?.imgId)
                : notification?.gifUrl
                    ? notification?.gifUrl
                    : notification?.imgUrl,
            comment: notification?.comment,
            reaction: notification?.reaction,
            senderName: notification?.userFrom ? notification?.userFrom.username : notification?.username,
        }

        setDialogContent(notDialog)
    }
    await markNotificationAsRead(id)
}