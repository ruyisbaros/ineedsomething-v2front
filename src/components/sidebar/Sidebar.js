import React, { useState, useEffect } from 'react'
import { sideBarItems, fontAwesomeIcons } from '@services/utils/static.data'
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "./sidebar.scss"

const Sidebar = () => {
    const { currentUser } = useSelector(store => store.currentUser)
    const [sidebar, setSidebar] = useState([])
    const location = useLocation()
    const navigate = useNavigate()

    const navigateToPage = (name, url) => {
        if (name === "Profile") {
            url = `${url}/${currentUser?.username}?${createSearchParams({ uId: currentUser?.uId, id: currentUser?._id })}`
        }
        navigate(url)
    }

    const activeUrl = (name) => {
        return location.pathname.includes(name.toLowerCase())
    }

    useEffect(() => {
        setSidebar(sideBarItems)
    }, [])

    return (
        <div className="app-side-menu">
            <div className="side-menu">
                <ul className="list-unstyled">
                    {
                        sidebar.map((data) => (
                            <li key={data.index} >
                                <div className={`sidebar-link ${activeUrl(data.name) ? 'active' : ''}`}
                                    onClick={() => navigateToPage(data.name, data.url)}>
                                    <div className="menu-icon">
                                        {fontAwesomeIcons[data.iconName]}
                                    </div>
                                    <div className="menu-link">
                                        <span>{data.name}</span>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Sidebar