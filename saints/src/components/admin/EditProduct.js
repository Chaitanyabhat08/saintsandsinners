import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import './EditProduct.css';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const alert = useAlert();
  const navigateTo = useNavigate();
  const { productId } = useParams();
  const [images, setImage] = useState([]);
  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/products/getProductDetails/${productId}`);
        const product = response.data.product;
        setImage(product.images);
        setName(product.name);
        setStock(product.stock);
        setPrice(product.price);
        setDescription(product.description);
        setCategory(product.category);
      } catch (error) {
        console.log(error);
      }
    };

    getProductDetails();
  }, [productId]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const payload = {
      name,
      stock,
      price,
      description,
      category,
    }
    const { data } = await axios.put(`/api/v1/admin/products/updateProduct/${productId}`, payload)
    if (data.success) {
      alert.success("Successfully Updated the Product")
    } else {
      alert.error("Error while updating product");
    }
    setImage([]);
    setName("");
    setStock(0);
    setPrice(0);
    setDescription("");
    setCategory("");
    navigateTo('/admin/dashboard');
  };

  return (
    <form id="mainForm" onSubmit={handleSubmit}>
        <div className='form-group' style={{ textAlign: "center", display: "flex" }}>
          <h5 htmlFor="image">Images:</h5>
          {images.map((image, index) => (
            <div key={index}>
              <img className="prodImage" src={image.url} alt={`Product Image ${index + 1}`} />
              <p>Public ID: {image.public_id}</p>
            </div>
          ))}
        </div>
      <div className='MainDiv' >
      <div className='form-group'>
        <h5 htmlFor="name">Name:</h5>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='form-group'> 
        <h5 htmlFor="stock">Stock:</h5>
        <input
          type="number"
          id="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>
      <div className='form-group'>
        <h5 htmlFor="price">Price:</h5>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className='form-group'>
        <h5 htmlFor="description">Description:</h5>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{width:"500px",marginLeft:"75px"}}
        />
      </div>
      <div className='form-group'>
        <h5 htmlFor="category">Category:</h5>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        </div>
        
        <button type="submit">Update Product</button>
      </div>
    </form>
  );
}

export default EditProduct;
