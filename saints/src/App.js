import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import WebFont from 'webfontloader';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails.js';
import Products from './components/Products/Products.js';
import Search from './components/Search/Search.js';
import LoginSignup from './components/User/loginSignup';
import Shipping from './components/cart/Shipping.js';
import Store from "./Store";
import { LoadUser } from './actions/userAction';
import Profile from './components/User/Profile.js';
import Cart from './components/cart/Cart.js';
import OrderConfirm from './components/cart/OrderConfirm.js';
import WishList from './components/cart/WishList.js';
import UpdateProfileOption from './components/User/UpdateProfileOption.js';
import UpdatePasswordOption from './components/User/UpdatePasswordOption.js';
import SaveAddress from './components/User/saveAddress';
import ForgotPasswordOption from './components/User/ForgotPasswordOption.js';
import ResetPasswordOption from './components/User/ResetPasswordOption.js';
import NewOrder from './components/cart/NewOrder.js';
import PaymentFailed from './components/cart/PaymentFailed.js';
import Navbar from './NavBar';
import Sidebar from './components/admin/sidebar';
import CreateNewProd from './components/admin/CreateNewProd';
import OrderDetails from './components/OrderDetails/OrderDetails';
import EditProduct from './components/admin/EditProduct';
import MyOrder from './components/Order/MyOrder';
import OrderDetail from './components/Order/OrderDetails';
import Notification from './components/Notifications/Notifications';

function App() {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Sans-serif", "Droid Sans", "Chilanka"]
      }
    })
    Store.dispatch(LoadUser())
  }, []);

  const isAdmin = user && user.role === 'admin';

  return (
    <>
      <Router>
        <Navbar toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/getProductDetails/:id" element={<ProductDetails />} />
          <Route path="/products/getallproducts/" element={<Products />} />
          <Route path="/products/getallproducts/:keyWord" element={<Products />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/users/loginUser" element={<LoginSignup />} />
          {user && isAuthenticated && <Route path="/users/getMyDetails" element={<Profile />} />}
          {user && isAuthenticated && <Route path="/users/updateProfile" element={<UpdateProfileOption />} />}
          {user && isAuthenticated && <Route path="/users/updatePassword" element={<UpdatePasswordOption />} />}
          {user && isAuthenticated && <Route path="/users/addAddress" element={<SaveAddress />} />}
          {user && isAuthenticated && <Route path="/Cart" element={<Cart />} />}
          <Route path="/users/forgotPassword" element={<ForgotPasswordOption />} />
          <Route path="/users/resetPassword/:token" element={<ResetPasswordOption />} />
          {user && isAuthenticated && <Route path="/users/loginUser/shipping" element={<Shipping />} />}
          {user && isAuthenticated && <Route path="/wishlist" element={<WishList />} />}
          {user && isAuthenticated && <Route path="/order/confirm" element={<OrderConfirm />} />}
          {user && isAuthenticated && <Route path="/payment/verified" element={<NewOrder />} />}
          {user && isAuthenticated && <Route path="/payment/failed" element={<PaymentFailed />} />}
          {user && isAuthenticated && <Route path="/order/viewOrderDetails" element={<OrderDetails />} />}
          {user && isAuthenticated && <Route path="/order/myorders" element={<MyOrder />} />}
          {user && isAuthenticated && <Route path="/order/getmyorder/:id" element={<OrderDetail />} />}
          {user && isAuthenticated && <Route path="/yournotifications" element={<Notification />} />}
          {user && isAdmin && isAuthenticated ? (
            <Route path="/admin/dashboard" element={<Sidebar />} />
          ) : (
              <Route path="/users/loginUser" element={<LoginSignup/>} />
          )}
          {user && isAdmin && isAuthenticated ? (
            <Route path="/admin/products/createnew" element={<CreateNewProd />} />
          ) : (
              <Route path="/users/loginUser" element={<LoginSignup />} />
          )}
          {user && isAdmin && isAuthenticated ? (
            <Route path="/admin/products/editproduct/:productId" element={<EditProduct />} />
          ) : (
              <Route path="/users/loginUser" element={<LoginSignup />} />
          )}
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
