import { LockOpen, MailOutline } from '@material-ui/icons';
import FaceIcon from '@mui/icons-material/Face';
import React, { Fragment, useRef, useState,useEffect } from 'react';
import "./loginSignup.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,useLocation } from "react-router-dom";
import { clearErrors, Login,Register } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';

const LoginSignup = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigateTo = useNavigate();
    const location = useLocation();
    const { error, loading, isAuthenticated } = useSelector(state => state.user);
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const [loginEmail, setLoginEmail] = useState(null);
    const [loginPassword, setLoginPassword] = useState(null);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [passwordShown, setPasswordShown] = useState(false);

    const { name, email, password } = user;
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/man.png")

    const loginSubmit = async (e) => {
        e.preventDefault();
        dispatch(Login(loginEmail, loginPassword))
    }
    const registerSubmit = async (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        await dispatch(Register(myForm))
    }

    const redirect = location.search ? location.search.split("=")[1] : "/users/getMyDetails" ;
    useEffect(() => {
        if (error) {
            alert.show(error);
            dispatchEvent(clearErrors());
        }
        if (user && isAuthenticated) {
            navigateTo(redirect)
        }
    }, [dispatch, alert, error, navigateTo, user,isAuthenticated,redirect]);
    
    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
              if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
              }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }
    return (
        loading ? <Loader />
            : <Fragment>
                 <MetaData title={`Login/Signup Page`} />
                <div className="container">
                    <div className="main">
                        <input type="checkbox" id="chk" aria-hidden="true" />
                        <div className="signup">
                            <form ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit} autoComplete='false'>
                                <label for="chk" aria-hidden="true">Sign Up</label>
                                <div className="registermailInput">
                                <FaceIcon/>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="User name"
                                    required
                                    value={name}
                                        onChange={registerDataChange} />
                                </div>
                                <div className="registermailInput">
                                    <MailOutline />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        onChange={registerDataChange} />
                                </div>
                                <div className="registerPasswordInput">
                                    <LockOpen />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        required
                                        value={password}
                                        onChange={registerDataChange}
                                    />                
                                </div>
                                <img className="avaImage" src={avatarPreview} alt="Avatar Preview" />
                                <div id="registerImage" style={{height:'auto',overflow:'scroll'}}>
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={registerDataChange}
                                    />
                                </div>
                                <button type="submit"
                                    value="register"
                                    className="signupBtn"
                                    disabled={loading ? true : false}
                                >Sign up</button>
                            </form>
                        </div>
                        <div className="login">
                            <form className="login_form" ref={loginTab} onSubmit={loginSubmit}>
                                <label for="chk" aria-hidden="true" >Login</label>
                                <div className="loginmailInput">
                                    <MailOutline />
                                    <input
                                        type="email"
                                        className="emailInput"
                                        placeholder="enter Email"
                                        required
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                </div>
                                <div className="loginPasswordInput">
                                    <LockOpen />
                                    <input
                                        type={passwordShown ? "text" : "password"}
                                        className="passwordInput"
                                        placeholder="enter password"
                                        required
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" value="Login" className="loginButton" disabled={loading ? true : false}>Login</button>
                            </form>
                            <Link to="/users/forgotPassword">Forgot Password?</Link>
                        </div>
                    </div>
                </div>
            </Fragment>
    )
}

export default LoginSignup

