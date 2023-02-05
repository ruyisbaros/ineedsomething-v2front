import React, { useState } from 'react'
import useLocalStorage from '@hooks/useLocalStorage';
import useSessionStorage from '@hooks/useSessionStorage';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@components/index';
import { toast } from 'react-toastify';
import { authService } from '@services/api/auth.service';
import { clearCurrentUser } from '@services/utils/util.service';
import { useDispatch } from 'react-redux';
import { changePassword } from '@services/api/user.service';
import "./changePassword.scss"
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [type, setType] = useState('password');
    const [togglePassword, setTogglePassword] = useState(false);
    const [deleteStorageUsername] = useLocalStorage('username', 'delete');
    const [setLoggedIn] = useLocalStorage('keepLoggedIn', 'set');
    const [deleteSessionPageReload] = useSessionStorage('pageReload', 'delete');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const togglePasswordDisplay = () => {
        setTogglePassword(!togglePassword);
        const inputType = type === 'password' ? 'text' : 'password';
        setType(inputType);
    };

    const handleChangePassword = async (event) => {
        event.preventDefault();
        if (newPassword === confirmPassword) {
            try {
                const response = await changePassword({
                    currentPassword,
                    newPassword,
                });
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                if (response) {
                    toast.success(response.data.message)
                    setTimeout(async () => {
                        clearCurrentUser({
                            dispatch,
                            deleteStorageUsername,
                            deleteSessionPageReload,
                            setLoggedIn
                        });
                        await authService.logout();
                        navigate('/');
                    }, 3000);
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        } else {
            toast.error("Passwords should match!")
        }
    };


    return (
        <div className='password-change-container'>
            <form onSubmit={handleChangePassword}>
                <div className="form-group">
                    <Input
                        id="currentPassword"
                        name="currentPassword"
                        type={type}
                        labelText="Current Password"
                        value={currentPassword}
                        handleChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <Input
                        id="newPassword"
                        name="newPassword"
                        type={type}
                        labelText="New Password"
                        value={newPassword}
                        handleChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={type}
                        labelText="Confirm New Password"
                        value={confirmPassword}
                        handleChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="form-group form-btn-group">
                    <div className="btn-group">
                        <Button label="Update" className="update" disabled={!currentPassword || !newPassword || !confirmPassword} />
                        <span className="eye-icon" onClick={togglePasswordDisplay}>
                            {!togglePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </span>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default ChangePassword
