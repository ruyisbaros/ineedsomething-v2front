import React, { useState, useEffect } from 'react'
import Avatar from '@components/avatar/Avatar';
import { Button } from '@components/index';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { generateString } from '@services/utils/util.service';
import { toast } from 'react-toastify';
import { followUser } from '@services/api/follower.service';
import { filter } from 'lodash';
import { addToSuggestions } from '@redux/suggestionsSlicer';
import "./suggestions.scss"



const Suggestions = () => {
    const { suggestUsers } = useSelector(store => store.suggestions)
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleFollowUser = async (user) => {
        try {
            const res = await followUser(user._id)
            toast.info(res.data.message)
            const filtered = filter(users, (data) => data._id !== user._id)
            setUsers(filtered)
            dispatch(addToSuggestions({ isLoading: false, users: filtered }))
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        setUsers(suggestUsers)
    }, [suggestUsers])
    //console.log(users);
    return (

        <div className="suggestions-list-container" >
            <div className="suggestions-header">
                <div className="title-text">Suggestions</div>
            </div>
            <hr />
            <div className="suggestions-container">
                <div className="suggestions">
                    {users?.map((user) => (
                        <div className="suggestions-item"
                            key={user.username}>
                            <Avatar
                                name={user?.username}
                                bgColor={user?.avatarColor}
                                textColor="#ffffff"
                                size={40}
                                avatarSrc={user?.profilePicture}
                            />
                            <div className="title-text">{user?.username}</div>
                            <div className="add-icon">
                                <Button
                                    label="Follow"
                                    className="button follow"
                                    disabled={false}
                                    handleClick={() => handleFollowUser(user)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                {
                    users.length >= 8 &&
                    <div className="view-more"
                        onClick={() => navigate("/app/social/people")}>
                        View More
                    </div>
                }
            </div>
        </div>
    )
}

export default Suggestions