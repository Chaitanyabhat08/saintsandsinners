import React, { Fragment, useState } from 'react';
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert';
import { useSelector, useDispatch } from 'react-redux';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { LogOutUser } from '../../../actions/userAction';
import Backdrop from "@material-ui/core/Backdrop";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { NotificationAdd } from '@mui/icons-material';

const UserOptions = ({ user }) => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const [open, setOpen] = useState(false);
  const options = [       
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <NotificationAdd />, name: "Notification", func: notifcation },
    { icon: <ShoppingCartCheckoutIcon style={{ color: cartItems.length >= 1 ? "tomato" : "unset" }} />, name: `Cart(${cartItems.length})`, func: cart },
    { icon: <FavoriteIcon style={{ color: wishlistItems.length >= 1 ? "tomato" : "unset" }} />, name: `Wishlist(${wishlistItems.length})`, func: wishList},
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ]
  if (user.role === "admin") {
    options.unshift({ icon: <DashboardIcon />, name: "DashBoard", func: dashBoard })
  }
  function dashBoard() {
    navigateTo('/admin/dashboard');
  }
  function cart() {
    navigateTo('/Cart');
  }
  function notifcation() {
    navigateTo('/yournotifications')
  }
  function orders() {
    navigateTo('/order/myorders');
  }
  function wishList() {
    navigateTo('/wishlist')
  }
  function account() {
    navigateTo('/users/getMyDetails');
  }
  async function logoutUser() {
    await dispatch(LogOutUser());
    navigateTo('/users/loginUser');
    alert.show( "Logged out Successfully!");
  }
  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: 10 }} />
      <SpeedDial
          ariaLabel="SpeedDail tooltip example"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          sx={{ position: 'absolute', top: 16, right: 16, zIndex:11}}
          direction="down"
          icon={
              <img
                className="speedDialIcon"
                src={user.avatar.url ? user.avatar.url : '/man.png'}
              alt="Profile" />
          }
      >
        
        {options.map((option) => (
          <SpeedDialAction
            key={option.name} icon={option.icon} tooltipTitle={option.name} onClick={option.func} tooltipOpen={window.innerWidth >=600 ? true : false } />
        )
        )}
        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions