import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './DashBoard.css';
import BarChart from './component/BarChart';
import DoughnutChart from './component/DoughtnutChart';
import { useAlert } from 'react-alert';

const DashBoard = () => {
  const [totalProducts, setTotalProducts] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [totalOrders, setTotalOrders] = useState([]);
  const [totalSum,setTotalSum] = useState(0);
  const alert = useAlert();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/products/getAllProducts');
        setTotalProducts(response.data.products);
        const users = await axios.get('/api/v1/admin/getAllUsers');
        setTotalUsers(users.data.users);
        const orders = await axios.get('/api/v1/admin/order/getAllOrders', {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        setTotalOrders(orders.data.orders);
        setTotalSum(orders.data.totalSum)
      } catch (error) {
        alert.error(error.message);
      }
    };

    fetchData();
  }, [alert]);

  const totalSumPerMonth = () => {
    // Calculate the total sum per month
    const monthlySum = totalOrders.reduce((sum, order) => {
      const month = new Date(order.createdAt).getMonth();
      sum[month] = (sum[month] || 0) + order.paymentInfo.totalPrice;
      return sum;
    }, []);
    return monthlySum;
  };
  const data = {
    bar: {
      title: "Total Earnings of the Year",
      labels: ["Jan", "Feb", "March", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Earnings per Month",
          data: totalSumPerMonth(), // Use the totalSum per month as data
          backgroundColor: "lightblue",
        },
      ],
    },

    line: {
      labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      datasets: [
        {
          label: "Earnings per Month",
          data: totalSumPerMonth(), // Use the totalSum per month as data
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
      ],
    },
  };
  return (
    <Fragment>
      <div className='DashboardDiv'>
        <h1>Welcome Admin!</h1>
        <div className='Cards'>
          <div className="card" style={{ width: "16rem", height: "9rem", color: "gray", textAlign: "center" }}>
            <img src="/acquisition.png" alt='totalsales' />
            <h5 className="card-title">Total Sales</h5>
            <h4>₹{totalSum}</h4>
          </div>
          <div className="card" style={{ width: "16rem", height: "9rem", color: "gray", textAlign: "center" }}>
            <img src="/shopping-bag.png" alt='totalOrders' />
            <h5 className="card-title">Total Orders</h5>
            <h4>{totalOrders.length}</h4>
          </div>
          <div className="card" style={{ width: "16rem", height: "9rem", color: "gray", textAlign: "center" }}>
            <img src="/products.png" alt='total Products' />
            <h5 className="card-title">Total Products</h5>
            <h4>{totalProducts.length}</h4>
          </div>
          <div className="card" style={{ width: "16rem", height: "9rem", color: "gray", textAlign: "center" }}>
            <img src="/people.png" alt='totalUsers' />
            <h5 className="card-title">Total Users</h5>
            <h4>{totalUsers.length}</h4>
          </div>
        </div>
        <div className='Chartsec'>
          <BarChart data={data} />
          <DoughnutChart/>
        </div>
        <div className="ordercard" style={{ width: "100%", height: "22rem", color: "gray", textAlign: "center" }}>
          <h2 style={{ textAlign: "center" }}>Latest Orders</h2>
          <hr/>
          <table className="order-table" cellspacing="1" cellpadding="1" style={{ width: "100%", color: "gray", textAlign: "center" }}>
            <thead>
              <tr>
                <th>Id</th>
                <th>User Email</th>
                <th>Price</th>
                <th>Order Created At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {totalOrders.slice(0, 4).reverse().map((order) =>
                <tr key={order._id} style={{ overflow: "scroll" }}>
                  <td>{order._id}</td>
                  <td>{order.user}</td>
                  <td>{order.paymentInfo.totalPrice}</td>
                  <td>{order.createdAt }</td>
                  <td>{order.orderStatus}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="ordercard" style={{ width: "100%", height: "25rem", color: "gray", textAlign: "center" }}>
          <h2 style={{ textAlign: "center" }}>Latest Users</h2>
          <hr />
            <table className="order-table" cellspacing="1" cellpadding="1"  style={{ width: "100%", color: "gray", textAlign: "center"}}>
              <thead>
                <th>id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Avatar</th>
              </thead>
              <tbody>
                {totalUsers.slice(0, 4).reverse().map((user) => (
                  <tr key={user._id} style={{ overflow: "scroll" }}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.role}</td>
                    <td><img src={user.avatar.url} alt="user img" style={{
                      width: "40px", height:"40px", borderRadius:"50%"}} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </Fragment>
  );
};

export default DashBoard;
