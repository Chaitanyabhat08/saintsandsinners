import React, { Fragment, useEffect,  } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import "./Profile.css";
import { LoadUser } from '../../actions/userAction';

const Profile = () => {
    const { isAuthenticated, user, loading } = useSelector(state => state.user);
    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user || !isAuthenticated) {
            dispatch(LoadUser());
            navigateTo('/users/loginUser');
         }
    }, [navigateTo, isAuthenticated, user,dispatch]);
    return (
        <Fragment>
            <MetaData title={`${user.name}'s profile`} />
            {loading ?
                (<Fragment>
                    <Loader />
                </Fragment>) : (
                    <Fragment>
                    <div className="profileContainer">
                        <div className="row">
                            <h3>My Profile</h3>
                            <img className="profilepic" src={user.avatar.url} alt={user.name} />
                            <div>
                                <h4>{user.name}</h4>
                            </div>
                            <Link to='/users/updateProfile'><button>Edit Profile</button></Link>
                        </div>
                        <div className="middle">
                            <div>
                                <h6>Contact : </h6>
                                <input className="inputField" value={user.phoneNumber} disabled></input>
                            </div>
                            <div>
                                <h6>Email : </h6>
                                <input className="inputField" value={user.email} disabled></input>
                            </div>
                            <div>
                                <h6>Joined on : </h6>
                                <input className="inputField" value={String(user.createdAt).substr(0, 10)} disabled></input>
                            </div>
                            <div className="but">
                               <button className="buttonSet"> <Link to="/order/myorders">My Orders</Link></button>
                                <button className="buttonSet"><Link to="/users/updatePassword">Update Password</Link></button>
                                <button className="buttonSet"><Link to="/users/addAddress">Add Address</Link></button>
                            </div>
                        </div>
                    </div>
                </Fragment >
            )}
            </Fragment>
      )
}

export default Profile