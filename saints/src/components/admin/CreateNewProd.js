import React, { useState } from 'react';
import './CreateNewProd.css';
import axios from 'axios';
import { Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

const CreateNewProd = () => {
  const alert = useAlert();
  const navigateTo = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };
  const removeImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const createNewProduct = async () => {
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('category', selectedCategory);
    formData.append('gender', selectedGender);
    selectedImages.forEach((image, index) => {
      formData.append('images', image, `image${index}`); // Assuming the field name is 'images'
    });
    try {
      const { data } = await axios.post('/api/v1/admin/products/createNewProduct', formData);
      if(data.success) alert.success("Product created successfully");
      navigateTo('/admin/products');
    } catch (error) {
      alert.error(error.message);
      setShowAlert(false);
    }
  };
  return (
    <div className="CreateprodDiv" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', margin:'20px' }}>
      <div id="createProdMain">
        <form id="createProdForm" onSubmit={createNewProduct} encType="multipart/form-data">
          <div className="form-group">
            <h6 htmlFor="productname">Name of the Product</h6>
            <input
              value={productName}
              type="text"
              className="form-control"
              id="productname"
              aria-describedby="Product Name"
              placeholder="Enter Product Name"
              required
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <h6 htmlFor="Decription">Description</h6>
            <textarea
              value={description}
              type="text"
              className="form-control"
              id="Description"
              placeholder="Description"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <h6 htmlFor="Price">Price ₹</h6>
            <input
              value={price}
              type="number"
              className="form-control"
              id="Price"
              placeholder="Price"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <h6 htmlFor="Stock">Stock</h6>
            <input
              value={stock}
              type="number"
              className="form-control"
              id="Stock"
              placeholder="Stock"
              required
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="form-group">
            <h6 htmlFor="Category">Category</h6>
            <select className="form-control" id="Category" onChange={(event) => setSelectedCategory(event.target.value)} required>
              <option value="">Select Category</option>
              <option value="Tshirt">Tshirt</option>
              <option value="Gadgets">Gadgets</option>
              <option value="Sweatshirts">Sweatshirts</option>
              <option value="Shirts">Shirts</option>
              <option value="Pants">Pants</option>
              <option value="Kurtis">Kurtis</option>
              <option value="SweatPants">SweatPants</option>
            </select>
          </div>
          <div className="form-group">
            <h6 htmlFor="Gender">Gender</h6>
            <select className="form-control" id="Gender" onChange={(e) => setSelectedGender(e.target.value)} required>
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <h6 htmlFor="Images">Images</h6>
            <input
              required
              type="file"
              className="form-control-file"
              id="Images"
              multiple
              onChange={handleFileChange}
              disabled={selectedImages.length >= 5} // Disable the button when 5 images are selected
            />
            {selectedImages.length >= 5 && (
              <p style={{ color: 'red', fontSize: '12px' }}>You can only upload up to 5 images</p>
            )}
          </div>
          <div className="image-preview">
            {selectedImages.map((image, index) => (
              <div key={index} className="preview-container">
                <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} className="preview-image" />
                <button type="button" className="remove-button" onClick={() => removeImage(index)}>
                  X
                </button>
              </div>
            ))}
          </div>
          <button type="submit" style={{ backgroundColor: 'gray', color: 'white' }} className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewProd;
