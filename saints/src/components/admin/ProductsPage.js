import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductsPage.css';
import ProdCard from './component/ProdCard';
import { Button } from 'antd';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
const ProductsPage = () => {
  const [allProducts, setTotalProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/products/getAllProducts');
        const allProducts = response.data.products;
        const filteredProducts = allProducts.filter(product =>
          product._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setTotalProducts(filteredProducts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [searchQuery]);
  return (
    <div className='ProdMain'>
      <h1>All Products</h1>
      <div className='headerPart' style={{ display : "flex"}}>
        <div style={{ margin:0,"marginTop": "25px" }}>
        <form style={{ display: "flex", position:"fixed", right:0}}>
          <input style={ { margin:0,height:"2.8vmax", width:"18vmax"}}
            placeholder="Search your product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="button" style={{ backgroundColor: "gray", color: "whitesmoke", width: "60px",margin:0, 'marginLeft':"5px" }}>
            <SearchIcon/>
          </button>
        </form>
      </div>
      <div className='CreateNew'>
          <Button style={{ backgroundColor: "Blue", color: "whitesmoke", width: "120px", height: "45px", position: "unset", right: 0, "margin": "30px" }}><Link style={{"text-decoration":"none"}} to="/admin/products/createnew">Create New </Link> </Button>
        </div>
      </div>
      <div className='allProd'>
        {allProducts && allProducts.reverse().map((product) => (
          <ProdCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductsPage;