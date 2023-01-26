import React, { useEffect, useCallback, useRef, useState } from 'react'
import { cloneDeep } from "lodash"
import "@components/toast/toast.scss"

const Toast = ({ toastList, position, autoDelete, autoDeleteTime = 2000 }) => {

    const [list, setList] = useState([])
    const listData = useRef([])

    const deleteToast = useCallback(() => {
        listData.current = cloneDeep(list)
        listData.current.splice(0, 1)
        setList([...listData])
        if (!listData.current.length) {
            setList([])
        }
    }, [list])

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
                        <button onClick={() => deleteToast()} className='cancel-button'>X</button>
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