import React from "react";
import "./OrderDetails.css";

export default function OrderDetails() {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const shippingInfo = localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {};
  console.log(shippingInfo)
  return (
    <div>
      <h2>Order Details</h2>
      <div className="orderDetails">
        <div className="orderDetailsHeader">
          <p>
            Ordered on {orderInfo && orderInfo.orderDate} | Order#{" "}
            {orderInfo && orderInfo.orderId}
          </p>
        </div>
        <div className="orderDetailsColumn">
          <h3>Shipping Address</h3>
          <p>{shippingInfo.address} {shippingInfo.city} {shippingInfo.state},{shippingInfo.pinCode}</p>
        </div>
        <div className="orderDetailsColumn">
          <h3>Payment Method</h3>
          <p>Pay on Delivery (Cash/Card). Cash on delivery (COD) available. Card/Net banking acceptance subject to device availability.</p>
        </div>
        <div className="orderDetailsColumn">
          <h3>Order Summary</h3>
          <p>Total: {orderInfo.subtotal}</p>
          <p>Shipping Charges: {orderInfo.shippingCharges}</p>
          <p>Grand Total: {orderInfo.totalPrice}</p>
        </div>
      </div>
      <div className="messageBox">
        <p className="arrivalMessage">Arriving Friday</p>
        <p className="orderDetailsMessage">
          Additional order details go here...
        </p>
      </div>
    </div>
  );
  
  
}
