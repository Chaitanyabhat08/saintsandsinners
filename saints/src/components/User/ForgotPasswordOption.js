import React, { Fragment,useEffect,useState } from 'react';
import MetaData from '../layout/MetaData';
import Loader from "../layout/Loader/Loader";
import { MailOutline } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert';
import { clearErrors,ForgotPassword } from '../../actions/userAction';
import './ForgotPassword.css';

const ForgotPasswordOption = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const alert = useAlert();
    const [email, setEmail] = useState("");
    const { error, message, loading } = useSelector((state) => state.forgotPassword);
    const forgotPasswordSubmit = async (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email", email);
        await dispatch(ForgotPassword(myForm));
        alert.success("Forgot Password Link Sent Successfully");
        navigateTo("/users/loginUser");
    }
    useEffect(() => {
        if (error) {
            alert.show(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.show(message);
        }
    }, [dispatch,error,message,alert]);
    return (
        loading?
        <Loader /> :
        <Fragment>
            <MetaData title={`Forgot Your Password ?`} />
                <div className="container4">
                    <div className="main4">
                        <div className="update4">
                            <form encType="multipart/form-data" onSubmit={forgotPasswordSubmit}>
                            <label for="chk" aria-hidden="true">{`Forgot Your Password ? :)`}</label>
                                <div className="forgotmailInput">
                                    <MailOutline />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)} />
                                </div>  
                                <button type="submit"
                                    value="send"
                                    className="sendBtn"
                                    disabled={loading ? true : false}
                                >Send Email</button>
                            </form>
                        </div>
                    </div>
                </div>
        </Fragment>
  )
}

export default ForgotPasswordOption