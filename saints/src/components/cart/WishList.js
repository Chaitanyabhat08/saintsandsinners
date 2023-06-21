import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemsFromWishlist, addItemToCart } from '../../actions/cartAction';
import './WishlistPage.css';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import Typography from 'antd/es/typography/Typography';
import { Link } from 'react-router-dom';
import { Alert } from 'antd';

const WishList = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeItemsFromWishlist(productId));
  };

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product.product, 1));
    dispatch(removeItemsFromWishlist(product.product));
    setShowAlert(true);
  };

  return (
    <div className="wishlist-container">
      {wishlistItems.length === 0 ? (
        <div className="emptyWishList">
          <HeartBrokenIcon />
          <Typography>No Product in Your Cart</Typography>
          <Link to="/products/getallproducts">View Products</Link>
        </div>
      ) : (
          <div className="wishlistPage">
            {showAlert && <Alert
              message="Successfully added"
              type="success"
              showIcon
              closable
            />}
          {wishlistItems && wishlistItems.map((item) => (
            <div className='listItem'>
              <div className="product-image">
                <img id="productImage" src={item.image} alt={item.name} />
              </div>
              <div className="product-details">
                <h5>{item.name}</h5>
                <h6>Price: ${item.price}</h6>
                <p>{item.stock !==0 ? 'In Stock' : 'Out of Stock'}</p>
                <div className="buttons-container">
                  <button
                    onClick={() => handleRemoveFromWishlist(item.product)}
                    className="remove-button"
                  >
                    <p>  Remove  </p>
                  </button>
                  {item.stock !==0 && (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="add-to-cart-button">
                      <p>Add to Cart</p>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;