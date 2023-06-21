import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import './Orders.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Cancel, Save } from '@material-ui/icons';
import { Button, Pagination, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteOrder } from '../../actions/orderAction';
import { useAlert } from 'react-alert';

const { Option } = Select;

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedOrderStatus, setEditedOrderStatus] = useState('');
  const dispatch = useDispatch();
  const alert = useAlert();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');

  // ... existing code ...

  const handleDelete = (orderId) => {
    setSelectedOrderId(orderId);
    setShowDeleteModal(true);
  };
  const fetchData = async () => {
    try {
      const { data } = await axios.get('/api/v1/admin/order/getAllOrders');
      setAllOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
    return (
      <div className="deleteModal">
        <div className="deleteModalContent">
          <h3>Confirm Delete</h3>
          <p>Are you sure you want to delete this order?</p>
          <div className="deleteModalButtons">
            <button className="deleteCancelButton" onClick={onCancel}>
              Cancel
            </button>
            <button className="deleteConfirmButton" onClick={onConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    // Perform search based on searchQuery
    const filteredOrders = allOrders.filter(
      (order) =>
        order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.user.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setAllOrders(filteredOrders);
  };

  const handleEditOrder = (orderId) => {
    console.log('Editing order:', orderId);
    setEditMode(true);
    const orderIndex = allOrders.findIndex((order) => order._id === orderId);
    const order = { ...allOrders[orderIndex] };
    setEditedOrderStatus(order.orderStatus);
    const updatedOrders = [...allOrders];
    updatedOrders[orderIndex] = order;
    setAllOrders(updatedOrders);
  };

  const handleSaveOrder = async (orderId) => {
    console.log('Saving order:', orderId);
    try {
      const orderIndex = allOrders.findIndex((order) => order._id === orderId);
      const order = { ...allOrders[orderIndex] };
      order.orderStatus = editedOrderStatus;
      const updatedOrders = [...allOrders];
      updatedOrders[orderIndex] = order;
      setAllOrders(updatedOrders);
      setEditMode(false);
      setEditedOrderStatus('');
      await axios.put('/api/v1/admin/order/updateOrderStatus', { orderId, status: editedOrderStatus });
      console.log('Order status updated successfully!');
    } catch (error) {
      console.log('Error updating order status:', error);
    }
  }

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedOrderStatus('');
  };

  const handleDeleteConfirm = async (orderId) => {
    // Implement your delete logic here
    try {
      const { data } = await axios.delete(`/api/v1/admin/order/deleteOrder/${orderId}`);
      if (data.success) {
        alert.success(data.message);
        window.location.reload(); // Reload the page after successful delete
      }
    } catch (error) {
      alert.error(error.message);
    }
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchData();
  };

  const handleOrderStatusChange = (value) => {
    setEditedOrderStatus(value);
  };

  return (
    <div>
      <h1>Orders</h1>
      <div className="headerPart" style={{ display: 'flex' }}>
        <div style={{ margin: 0, marginTop: '25px' }}>
          <form style={{ display: 'flex', position: 'fixed', right: 0 }}>
            <input
              style={{ margin: 0, height: '2.4vmax', width: '18vmax' }}
              placeholder="Enter OrderId"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <Button
              type="button"
              style={{
                backgroundColor: 'gray',
                color: 'whitesmoke',
                width: '60px',
                margin: 0,
                marginLeft: '5px',
              }}
              onClick={handleSearch}
            >
              <SearchIcon />
            </Button>
            <Button
              type="button"
              style={{
                backgroundColor: 'gray',
                color: 'whitesmoke',
                width: '90px',
                margin: 0,
                marginLeft: '5px',
              }}
              onClick={handleClearSearch}
            >
              Clear
            </Button>
          </form>
        </div>
      </div>
      <div>
        {allOrders.map((order, index) => (
          <div style={{ color: 'black', display: 'flex', flexDirection: 'column',marginBottom:'10px' }} key={index}>
            <div className="card-header">
              <p>Order ID: {order._id}</p>
              {showDeleteModal && (
                <DeleteConfirmationModal
                  onConfirm={() => handleDeleteConfirm(order._id)}
                  onCancel={handleDeleteCancel}
                />
              )}
              {editMode && order.orderStatus !== 'Delivered' ? (
                <Select value={editedOrderStatus} onChange={handleOrderStatusChange} style={{width:'350px'}}>
                  <Option value="Created">Created</Option>
                  <Option value="Processing">Processing</Option>
                  <Option value="Intransit">In-transit</Option>
                  <Option value="Delivered">Delivered</Option>
                </Select>
              ) : (
                  <input value={order.orderStatus} readOnly style={{ width: '350px' }} />
              )}
              <div className="buttons" style={{ right: 0, position: 'absolute',padding:'10px' }}>
                {editMode ? (
                  <>
                    <Save onClick={() => handleSaveOrder(order._id)} />
                    <Cancel onClick={() => handleCancelEdit()} />
                  </>
                ) : (
                  <>
                    <EditIcon onClick={() => handleEditOrder(order._id)} />
                      <DeleteIcon onClick={() => handleDelete(order._id)} />
                  </>
                )}
              </div>
            </div>
            <div>
              <p>Ordered Items</p>
              <div className="cartItems" style={{ width: '100%', display: 'flex' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <div className="card-stack">
                    {order.cartItems.map((item, itemIndex) => (
                      <div
                        className={`EachCard ${itemIndex === hoveredIndex ? 'hovered' : ''}`}
                        key={itemIndex}
                        style={{ position: 'relative', left: `${itemIndex * -110}px`, zIndex: itemIndex }}
                        onMouseEnter={() => setHoveredIndex(itemIndex)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <img src={item.image} alt="Productpic" />
                        <div className="card-body">
                          <h6>{item.name}</h6>
                          <h6>Price: ₹{item.price}</h6>
                          <h6>Quantity: {item.quantity}</h6>
                          <p>ProductID: {item.product}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="paymentInfoCard">
                    <div className="card-body">
                      <h5>Payment Details</h5>
                      <h6>
                        Razorpay ID:
                        <p>{order.paymentInfo.orderId}</p>
                      </h6>
                      <h6>Order Date: {new Date(order.paymentInfo.orderDate).toLocaleString()}</h6>
                      <h6>Subtotal: ₹{order.paymentInfo.subtotal}</h6>
                      <h6>Tax: ₹{order.paymentInfo.tax}</h6>
                      <h6>Shipping Charges: ₹{order.paymentInfo.shippingCharges}</h6>
                      <h6>Total Price: ₹{order.paymentInfo.totalPrice}</h6>
                    </div>
                  </div>
                  <div className="shippingInfoCard">
                    <div className="card-body">
                      <h5>Customer Info</h5>
                      <h6>User : {order.user}</h6>
                      <h6>Phone No. : {order.shippingInfo.phoneNo}</h6>
                      <h6>Address lane : {order.shippingInfo.address}</h6>
                      <h6>City : {order.shippingInfo.city}</h6>
                      <h6>PinCode : {order.shippingInfo.pinCode}</h6>
                      <h6>State : {order.shippingInfo.state}</h6>
                      <h6>Country: {order.shippingInfo.country}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
