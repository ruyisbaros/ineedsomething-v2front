import React, { useEffect, useCallback, useRef, useState } from 'react'
import { cloneDeep } from "lodash"
import { useDispatch } from 'react-redux'
import "@components/toast/toast.scss"
import { dispatchClearNotifications } from '@services/utils/util.service'

const Toast = ({ toastList, position, autoDelete, autoDeleteTime = 2000 }) => {

    const [list, setList] = useState([])
    let listData = []
    const dispatch = useDispatch()

    const deleteToast = useCallback(() => {
        listData = cloneDeep(list)
        listData.splice(0, 1)
        setList([...listData])
        if (!listData.length) {
            list.length = 0
            dispatchClearNotifications(dispatch)
        }
    }, [list, dispatch])

    useEffect(() => {
        setList([...toastList])
    }, [toastList])

    useEffect(() => {
        const tick = () => {
            deleteToast()
        }
        if (autoDelete && toastList.length && list.length) {
            const interval = setInterval(tick, autoDeleteTime)

            return () => {
                clearInterval(interval)
            }
        }
    }, [autoDelete, autoDeleteTime, deleteToast, list, toastList])

    return (
        <div className={`toast-notification-container ${position}`}>
            {
                list.map((toast, index) => (
                    <div
                        key={index}
                        className={`toast-notification toast ${position}`}
                        style={{ backgroundColor: toast.backgroundColor }}
                    >
                        <button onClick={deleteToast} className='cancel-button'>X</button>
                        <div
                            className={`toast-notification-image ${toast.description.length <= 73 ? "toast-icon" : ""}`}>
                            <img src={toast.icon} alt="" />
                        </div>
                        <div
                            className={`toast-notification-message ${toast.description.length <= 73 ? "toast-message" : ""}`}>
                            {toast.description}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Toast