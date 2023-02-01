import { addToSuggestions } from "@redux/suggestionsSlicer"
import axios from "@services/axios"
import { socketService } from "@services/sockets/socket.service"
import { cloneDeep, find, findIndex, filter } from "lodash"
import { userLoggedSuccess } from '@redux/currentUserSlicer';
import { removeUserFromList } from "@services/utils/util.service";

export async function getFollowers(userId) {
    return await axios.get(`/user/followers/get_followers/${userId}`)
}

export async function getFollowings() {
    return await axios.get("/user/followers/get_followings")
}

export async function follow(id) {
    return await axios.put(`/user/followers/follow/${id}`)
}
export async function unFollow(id) {
    return await axios.put(`/user/followers/un_follow/${id}`)
}
export async function block(id) {
    return await axios.put(`/user/followers/block/${id}`)
}

export async function unBlock(id) {
    return await axios.put(`/user/followers/un_block/${id}`)
}


//SOCKET IO FUNCTIONS
export function socketIOFollowUnFollow(users, followers, setFollowers, setUsers) {
    socketService?.socket?.on("add follower", (data) => {
        const userData = find(users, (user) => user._id === data._id)
        if (userData) {
            const updatedFollowers = [...followers, data]
            setFollowers(updatedFollowers)
            updateSingLeUser(users, userData, data, setUsers)
        }
    })

    socketService?.socket?.on("remove follower", (data) => {
        const userData = find(users, (user) => user._id === data._id)
        if (userData) {
            const updatedFollowers = filter(followers, (user) => user._id !== data._id)
            setFollowers(updatedFollowers)
            updateSingLeUser(users, userData, data, setUsers)
        }
    })

}

export function socketIOFollowUsersSuggestions(users, dispatch) {
    users = cloneDeep(users)
    socketService?.socket?.on("add follower", (data) => {
        const userIndex = findIndex(users, (user) => user._id === data._id)
        if (userIndex > -1) {
            users.splice(userIndex, 1)
            dispatch(addToSuggestions({ users, isLoading: false }))
        }
    })
}

export function socketIORemoveFollowing(following, setFollowing) {
    socketService?.socket?.on("remove follower", (data) => {
        const updatedFollowing = filter(following, (user) => user._id !== data._id)
        setFollowing(updatedFollowing)
    })
}

export function socketIOBlockAndUnblock(profile, token, setBlockedUsers, dispatch) {
    socketService?.socket?.on("blocked userId", (data) => {
        const user = addBlockedUser(profile, data)
        setBlockedUsers(profile.blocked)
        dispatch(userLoggedSuccess({ currentUser: user, token }))
    })

    socketService?.socket?.on("unblocked userId", (data) => {
        const user = removeBlockedUser(profile, data)
        setBlockedUsers(profile.blocked)
        dispatch(userLoggedSuccess({ currentUser: user, token }))
    })
}

export function socketIOBlockAndUnblockCard(user, setUser) {
    socketService?.socket?.on("blocked userId", (data) => {
        const userData = addBlockedUser(user, data)
        setUser(userData)
    })

    socketService?.socket?.on("unblocked userId", (data) => {
        const userData = removeBlockedUser(user, data)
        setUser(userData)
    })
}



//SOCKET IO HELPER FUNCTIONS
function addBlockedUser(user, data) {
    user = cloneDeep(user)
    if (user._id === data.blockedBy) {
        user.blocked.push(data.blockedUser)
    }

    if (user._id === data.blockedUser) {
        user.blockedBy.push(data.blockedBy)
    }

    return user
}

function removeBlockedUser(user, data) {
    user = cloneDeep(user)
    if (user._id === data.blockedBy) {
        user.blocked = [...removeUserFromList(user.blocked, data.blockedUser)]
    }

    if (user._id === data.blockedUser) {
        user.blockedBy = [...removeUserFromList(user.blockedBy, data.blockedBy)]
    }

    return user
}

function updateSingLeUser(users, userData, followerData, setUsers) {
    users = cloneDeep(users)
    userData.followersCount = followerData.followersCount
    userData.followingCount = followerData.followingCount
    userData.postsCount = followerData.postsCount
    const index = findIndex(users, (user) => user._id === userData._id)
    if (index > -1) {
        users.splice(index, 1, userData)
        setUsers(users)
    }
}