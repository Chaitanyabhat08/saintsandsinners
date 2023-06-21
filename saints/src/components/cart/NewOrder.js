import { useNavigate } from "react-router";
import {useDispatch } from "react-redux";
import './NewOrder.css'
import { useEffect } from "react";
import { createOrder } from "../../actions/orderAction"
import CheckoutSteps from "./CheckoutSteps";

const NewOrder = (data) =>{
  const shippingInfo = localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {};
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const onCompleteValue = localStorage.getItem('onComplete');
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  const onCompleteData = JSON.parse(onCompleteValue);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const viewproductHandler = () => {
    navigateTo('/products/getAllProducts');
  }
  const viewOrderDetails = () => {
    navigateTo('/order/viewOrderDetails');
  }
  
  useEffect(() => {
    dispatch(createOrder(shippingInfo,orderInfo,cartItems));
  }, [dispatch, shippingInfo, orderInfo, cartItems])
  return (
    <div className="mainDiv">
      <CheckoutSteps activeStep={1}/>
      <div class="card1">
        <div style={{ "border-radius":"200px","height":"200px", "width":"200px", "background": "#F8FAF5", "margin":"0 auto"}}>
          <i class="checkmark">✓</i>
        </div>
        <h1>Success</h1>
        <p>We received your purchase request;<br /> we'll be in touch shortly!</p>
        <div className="buttonSet">
          <button onClick={viewproductHandler}>View Products</button>
          <button onClick={viewOrderDetails}>Order Details</button>
          <button>Invoice</button>
        </div>
      </div>
    </div>
  )
}

export default NewOrder;