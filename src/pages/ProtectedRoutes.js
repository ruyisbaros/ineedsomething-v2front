import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useLocalStorage from '@hooks/useLocalStorage';
import useSessionStorage from '@hooks/useSessionStorage';
import useEffectOnce from '@hooks/useEffectOnce';
import { currentUserCheck } from '@services/api/user.service';
import { userLoggedSuccess } from '@redux/currentUserSlicer';
import { clearCurrentUser } from '@services/utils/util.service';
import { authService } from '@services/api/auth.service';
import { Navigate, useNavigate } from 'react-router-dom';
import { getConversationList } from '@services/api/chat.service';

const ProtectedRoutes = ({ children }) => {
    const { currentUser, token } = useSelector(store => store.currentUser)
    const [userData, setUserData] = useState(null)
    const [isTokenValid, setIsTokenValid] = useState(false)
    const getLoggedMeIn = useLocalStorage("keepLoggedIn", "get")
    const getPageReload = useSessionStorage("pageReload", "get")
    const [setLoggedMeIn] = useLocalStorage("keepLoggedIn", "set")
    const [deleteStoreUsername] = useLocalStorage("username", "delete")
    const [deleteStoragePageReload] = useSessionStorage("pageReload", "delete")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const checkUser = useCallback(async () => {
        try {
            const res = await currentUserCheck()
            dispatch(getConversationList())
            setUserData(res.data.user)
            setIsTokenValid(true)
            dispatch(userLoggedSuccess({ currentUser: res.data.user, token: res.data.token }))
        } catch (error) {
            setIsTokenValid(false)
            setTimeout(async () => {
                clearCurrentUser({ dispatch, deleteStoragePageReload, deleteStoreUsername, setLoggedMeIn })
                await authService.logout()
                navigate("/")
            }, 1000)
        }
    }, [dispatch, navigate, deleteStoragePageReload, deleteStoreUsername, setLoggedMeIn])

    useEffectOnce(() => {
        checkUser()
    })

    if (getLoggedMeIn || (!getLoggedMeIn && userData) || (currentUser && token) || getPageReload) {
        if (!isTokenValid) {
            return <></>
        } else {
            return (
                <>
                    {children}
                </>
            )
        }
    } else {
        return <>{<Navigate to="/" />}</>
    }
}

export default ProtectedRoutes