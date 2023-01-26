import axios from "@services/axios"

export async function getUserNotifications() {
    const res = await axios.get("/notifications/get")
    return res;
}

export async function markNotificationAsRead(id) {
    const res = await axios.put(`/notifications/update/${id}`)
    return res;
}

export async function deleteUserNotifications(id) {
    const res = await axios.delete(`/notifications/delete/${id}`)
    return res;
}

