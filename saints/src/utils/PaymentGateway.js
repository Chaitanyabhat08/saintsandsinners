const DisplayRazorPay = async (user,shippingInfo,cartItems) => {
  const orderInfo = sessionStorage.getItem("orderInfo");
  const data = await fetch("/api/v1/razorpay", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: orderInfo,
  }).then((t) => t.json());
  const options = {
    key: "rzp_test_5zmuo6noGtsP6M",
    name:"S&S",
    currency: data.currency,
    amount: data.amount,
    description: 'Wallet payment',
    order_id: data.id,
    callback_url: "http://localhost:3000/api/v1/payment/verify",
    redirect:true,
    prefill: {
      name: user.name,
      email: user.email,
      contact: user.phoneNumber,
    },
    notes: {
      address: "s&s"
    },
  };
  const paymentObject = new window.Razorpay(options)
  paymentObject.open();
};

export default DisplayRazorPay;