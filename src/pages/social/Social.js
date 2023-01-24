import Header from '@components/header/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import "./social.scss"
const Social = () => {
    return (
        <>
            <Header />
            <div className="dashboard">
                <div className="dashboard-sidebar">
                    <div>Sidebar</div>
                </div>
                <div className="dashboard-content">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Social