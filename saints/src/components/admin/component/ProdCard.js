
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './ProdCard.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';
import { useAlert } from "react-alert";
const ProdCard = ({ product }) => {
  const navigateTo = useNavigate();
  const alert = useAlert();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [delObj, setDelObj] = useState("");
  const handleDelete = async (id) => {
    const { data } = await axios.put(`/api/v1/admin/products/deleteProduct/${delObj}`);
    if (data.success) { 
      alert.success("Successfully deleted")
      navigateTo('/admin/dashboard')
    }
    setShowDeleteModal(false);
  };
  const beforedelete = (id) => {
    setDelObj(id);
    setShowDeleteModal(true);
  }
  return (
    <div className="prodDiv">
      <Link className="prodCard" to={`/products/getProductDetails/${product._id}`} style={{ textDecoration: 'none' }}>
        <img className="prodPic" src={product.images[0].url} alt={product.name} />
        <p>#id : {product._id}</p>
        {product.stock >= 1 ? <p style={{ color: 'green', backgroundColor: 'white', border: '1px solid black' }}>In stock</p> : <p style={{color:'tomato',backgroundColor:'pink',border:'1px solid black'}}>Out of stock</p>}
        <h6 className="prodName" style={{margin:0}}>{product.name}</h6>
        <span className="prodPrice">{`₹${product.price}`}</span>
        <span className="prodPrice">Stock : {product.stock}</span>
      </Link>
      <div style={{ display: 'flex', justifyContent: "space-between",alignItems:'center' }}>
        <Button className="btn" style={{ cursor: "pointer", border: '1px solid black', margin: '5px', textDecoration: 'none' }}>
          <Link to={`/admin/products/editproduct/${product._id}`} >
          <BorderColorIcon />
          </Link>
        </Button>
        <Button className="btn" onClick={() => beforedelete(product._id)} style={{ cursor: "pointer",border: '1px solid black', margin: '15px' }}>
          <DeleteIcon />
        </Button>
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
          <Modal.Header>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this item?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              className="btn"
              onClick={() => handleDelete()}
              style={{ cursor: "pointer" }}
            >
             Delete
            </Button>
          </Modal.Footer>
        </Modal>
        </div>

    </div>
  )
}
export default ProdCard;