import React, { Fragment, useState, useEffect } from 'react';
import { MailOutline } from '@material-ui/icons';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import FaceIcon from '@mui/icons-material/Face';
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { clearErrors, LoadUser, UpdateProfile } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import "./UpdateProfile.css";
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';
import MetaData from '../layout/MetaData';

const UpdateProfileOption = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const alert = useAlert();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [avatar, setAvatar] = useState(user.avatar);
    const [avatarPreview, setAvatarPreview] = useState("/man.png");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState();
    const updateProfileSubmit = async (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("phoneNumber", phoneNumber);
        myForm.set("address", address);
        myForm.set("avatar", avatar);
        await dispatch(UpdateProfile(myForm));
        alert.success("Profile updated successfully!");
        navigateTo("/users/getMyDetails");
    }
    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setName(user.name);
            setPhoneNumber(user.phoneNumber);
            setAddress(user.address);
            setAvatar(user.avatar);
            setAvatarPreview(user.avatar.url);
        }
        if (error) {
            alert.show(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.show("Profile Updated Successfully!");
            dispatch(LoadUser());
            navigateTo("/users/getMyDetails");
            dispatch({
                type: UPDATE_PROFILE_RESET
            });
        }
    }, [dispatch, alert, error, navigateTo, user, isUpdated]);
    
    const updateProfileDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    return (
            loading?
            <Loader /> :
            <Fragment>
                <MetaData title={`Update your profile ${user.name}`} />
                    <div className="container2">
                        <div className="main2">
                            <div className="update">
                                <form encType="multipart/form-data" onSubmit={updateProfileSubmit}>
                                <label for="chk" aria-hidden="true">Update Your Profile :</label>
                                <div className="updatemailInput">
                                        <FaceIcon/>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="User name"
                                        required="true"
                                        value={name}
                                        onChange={(e)=>setName(e.target.value)} />
                                    </div>
                                    <div className="updatemailInput">
                                        <MailOutline />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            required
                                            value={email}
                                            onChange={(e)=>setEmail(e.target.value)} />
                                </div>
                                <div className="updatemailInput">
                                        <ContactPhoneIcon />
                                        <input
                                            type="Number"
                                            name="Contact"
                                            placeholder="Contact Number"
                                            required
                                            value={phoneNumber}
                                            onChange={(e)=>setPhoneNumber(e.target.value)} />
                                    </div>
                                    <img className="avaImage" src={avatarPreview} alt="Avatar Preview" />
                                    <div id="registerImage">
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={updateProfileDataChange}
                                        />
                                </div>
                                    <button type="submit"
                                        value="register"
                                        className="signupBtn"
                                        disabled={loading ? true : false}
                                    >Update</button>
                                </form>
                        </div>

                        </div>
                </div>
            </Fragment>
    )
}

export default UpdateProfileOption;