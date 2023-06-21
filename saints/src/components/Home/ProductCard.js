import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import ReactStars from 'react-rating-stars-component';
import { Button } from 'antd';
import { addItemToCart, addtoWishlist } from '../../actions/cartAction';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import FavoriteIcon from '@mui/icons-material/Favorite';


const Product = ({ product }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const addToCartHandler = (id, itemsCount) => {
        dispatch(addItemToCart(id, itemsCount));
        alert.success("Items added successfully");
    }
    let options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "Tomato",
        size: window.innerWidth < 300 ? 10 : 15,
        value: product.rating,
        isHalf: true
    }
    const { wishlistItems } = useSelector((state) => state.wishlist);
    const isLiked = wishlistItems.some((item) => item.product === product._id);

    const addToWishlist = (productId) => {
        dispatch(addtoWishlist(productId));
        alert.success('Wishlisted');
    };
    return (
        <div className="productDiv">
            <Link className="productCard" to={`/products/getProductDetails/${product._id}`} style={{ textDecoration: 'none' }}>
                <img src={product.images[0].url} alt={product.name} />
                <p>{product.name}</p>
                <div>
                    <ReactStars {...options} /><span>({product.numOfReviews} Reviews)</span>
                </div>
                <span>{`₹${product.price}`}</span>
            </Link>
            {product.stock>=1 ?
                <div className='buttonSec'>
                    <div className='button'>
                        <FavoriteIcon
                            id="heart"
                            onClick={() => addToWishlist(product._id)}
                            style={{ color: isLiked ? 'red' : 'gray' }}
                        />
                        <Button className='btn' onClick={() => addToCartHandler(product._id, 1)}>Add to cart</Button>
                    </div>
                    <div>
                        <Button className='btn' onClick={() => console.log('clicked buy')}>Buy Now</Button>
                    </div>
                </div> 
                :
                <div className='buttonSec'>
                    <Button className='btn' style={{backgroundColor:'tomato'}}>
                        Out of stock
                    </Button>
                </div>
               
            }
        </div>
    )
}

export default Product;