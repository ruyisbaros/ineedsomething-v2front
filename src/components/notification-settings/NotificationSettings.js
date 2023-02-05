import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { notificationItems } from '@services/utils/static.data';
import { Button } from '@components/index';
import { cloneDeep } from 'lodash';
import Toggle from '@components/toggle/Toggle';
import { generateString } from '@services/utils/util.service';
import "./notificationSettings.scss"
import { toast } from 'react-toastify';
import { updateCurrentUser } from '@redux/currentUserSlicer';
import { updateUsersNotificationSettings } from '@services/api/user.service';

const NotificationSettings = () => {
    let { currentUser } = useSelector(store => store.currentUser)
    const [notificationTypes, setNotificationTypes] = useState([]);
    let [notificationSettings, setNotificationSettings] = useState(currentUser?.notifications);
    const dispatch = useDispatch();

    const mapNotificationTypesToggle = useCallback(
        (notifications) => {
            for (const notification of notifications) {
                const toggled = notificationSettings[notification.type];
                notification.toggle = toggled;
            }
            setNotificationTypes(notifications);
        },
        [notificationSettings]
    );

    const updateNotificationTypesToggle = (itemIndex) => {
        const updatedData = notificationTypes.map((item, index) => {
            if (index === itemIndex) {
                return {
                    ...item,
                    toggle: !item.toggle
                };
            }
            return item;
        });
        setNotificationTypes(updatedData);
    };
    const sendNotificationSettings = async () => {
        try {
            const response = await updateUsersNotificationSettings(notificationSettings);
            currentUser = cloneDeep(currentUser);
            currentUser.notifications = response.data.settings;
            dispatch(updateCurrentUser(currentUser));
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };

    useEffect(() => {
        mapNotificationTypesToggle(notificationItems);
    }, [notificationTypes, mapNotificationTypesToggle]);
    return (
        <>
            <div className="notification-settings">
                {notificationTypes.map((data, index) => (
                    <div
                        className="notification-settings-container"
                        key={generateString(10)}
                        data-testid="notification-settings-item"
                    >
                        <div className="notification-settings-container-sub-card">
                            <div className="notification-settings-container-sub-card-body">
                                <h6 className="title">{`${data.title}`}</h6>
                                <div className="subtitle-body">
                                    <p className="subtext">{data.description}</p>
                                </div>
                            </div>
                            <div className="toggle" data-testid="toggle-container">
                                <Toggle
                                    toggle={data.toggle}
                                    onClick={() => {
                                        updateNotificationTypesToggle(index);
                                        notificationSettings = cloneDeep(notificationSettings);
                                        notificationSettings[data.type] = !notificationSettings[data.type];
                                        setNotificationSettings(notificationSettings);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <div className="btn-group">
                    <Button label="Update" className="update" disabled={false} handleClick={sendNotificationSettings} />
                </div>
            </div>
            <div style={{ height: '1px' }}></div>
        </>
    )
}

export default NotificationSettings
