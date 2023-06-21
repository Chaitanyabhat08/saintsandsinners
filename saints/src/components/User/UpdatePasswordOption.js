import React, { Fragment, useState, useEffect } from 'react';
import './updatePassword.css';
import Loader from '../layout/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { clearErrors, UpdatePassword, LoadUser } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant';
import MetaData from '../layout/MetaData';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyOffIcon from '@mui/icons-material/VpnKeyOff';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const UpdatePasswordOption = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const alert = useAlert();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
    const [oldPassword, setoldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const updatePasswordSubmit = async(e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        await dispatch(UpdatePassword(myForm));
    }
    useEffect(() => {
        if (error) {
            alert.show(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.show("Profile Updated Successfully!");
            dispatch(LoadUser());
            navigateTo("/users/getMyDetails");
            dispatch({
                type: UPDATE_PASSWORD_RESET
            });
        }
    }, [dispatch, alert, error, navigateTo, isUpdated]);
  return (
    loading?
    <Loader /> :
    <Fragment>
        <MetaData title={`Update your Pssword ${user.name}`} />
            <div className="container3">
                <div className="main3">
                    <div className="update">
                        <form encType="multipart/form-data" onSubmit={updatePasswordSubmit}>
                        <label for="chk" aria-hidden="true">Update Your Password</label>
                            <div className="updatePasswordInput">
                              <VpnKeyOffIcon/>
                            <input
                                type="password"
                                name="Old Password"
                                placeholder="Enter your old password"
                                required="true"
                                value={oldPassword}
                                onChange={(e)=>setoldPassword(e.target.value)} />
                            </div>
                              <div className="updatePasswordInput">
                                  <VpnKeyIcon />
                                  <input type="password"
                                    name="New Password"
                                    placeholder="Enter your new password"
                                    required
                                    value={newPassword}
                                    onChange={(e)=>setNewPassword(e.target.value)}
                                  />
                              </div>
                              <div className="updatePasswordInput">
                              <LockIcon/>
                                <input
                                    type="password"
                                    name="Confirm Password"
                                    placeholder="Confirm your password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e)=>setConfirmPassword(e.target.value)} />
                            </div>
                            <button type="submit"
                                value="register"
                                className="updateBtn"
                                disabled={loading ? true : false}
                            >Update</button>
                        </form>
                    </div>
                </div>
            </div>
    </Fragment>
)
}

export default UpdatePasswordOption