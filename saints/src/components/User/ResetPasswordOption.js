import React, { Fragment, useState, useEffect } from 'react';
import './ResetPassword.css';
import Loader from '../layout/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors, ResetPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const ResetPasswordOption = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const alert = useAlert();
    const { token } = useParams();

    const { error, success, loading } = useSelector((state) => state.resetPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const updatePasswordSubmit = async(e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("newPassword", password);
        myForm.set("confirmPassword", confirmPassword);
        await dispatch(ResetPassword(token, myForm));
    }

    useEffect(() => {
        if (error) {
            alert.show(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.show("Password Updated Successfully!");
            navigateTo("/users/loginUser");
        }
    }, [dispatch, alert, error, navigateTo, success]);
  return (
    loading?
    <Loader /> :
    <Fragment>
        <MetaData title={`Update your Pssword`} />
            <div className="container5">
                <div className="main5">
                    <div className="update5">
                        <form encType="multipart/form-data" onSubmit={updatePasswordSubmit}>
                        <label for="chk" aria-hidden="true">Reset Your Password</label>
                              <div className="updatePasswordInput">
                                  <VpnKeyIcon />
                                  <input type="text"
                                    name="New Password"
                                    placeholder="Enter your new password"
                                    required
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
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
                                className="updatePsdBtn"
                                disabled={loading ? true : false}
                            >Update</button>
                        </form>
                    </div>
                </div>
            </div>
    </Fragment>
)
}
export default ResetPasswordOption