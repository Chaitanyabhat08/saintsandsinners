import React, { Fragment, useEffect ,useState} from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import {clearErrors, getProductDetails} from '../../actions/productActions';
import ReactStars from 'react-rating-stars-component';
import Loader from "../layout/Loader/Loader";
import ReviewCard from "./ReviewCard.js";
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import { addItemToCart } from '../../actions/cartAction';
// import StarRating from "../layout/StarRating"
import axios from 'axios';
    
const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { product, loading, error } = useSelector((state) => state.productDetails);
    const [itemsCount, setItemsCount] = useState(1);
    const [reviewForm, setReviewForm] = useState(false);
    const [yourReview, setYourReview] = useState(null);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (error) {
            alert.show(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, alert,error]);
    let options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "Tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.rating,
        isHalf: true
    }
    const handleIncrement = () => { 
        if (product.stock <= itemsCount) return;
        const qty = itemsCount + 1;
        setItemsCount(qty);
    }
    const handleDecrement = () => { 
        if (itemsCount <= 1) return;
        const qty = itemsCount - 1;
        setItemsCount(qty);
    }
    const addToCartHandler = () => { 
        dispatch(addItemToCart(id, itemsCount));
        alert.success("Items added successfully");
    }
    const reviewHandler = () => {
        setReviewForm(true);
    }
    const submitReviewHandler = async(id) => {
        const payload = {
            rating,
            comment: yourReview,
            productId:id,
        }
        axios
            .put('/api/v1/products/review', payload)
            .then((response) => {
                if (response.data.success) {
                    alert.success('Review submitted successfully');
                }
            })
            .catch((error) => {
                alert.error(error.message);
            });

    }   
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };
    return (
        loading ? <Loader /> 
            :
            <Fragment>
            <MetaData title={`s&s ${product.name}`} />
            <div className="ProductDetails">
                <div className="image">
                <Carousel>
                    {
                        product.images && product.images.map((item, i) => (
                            <img
                                className="CarouselImage"
                                key={item.url}
                                src={item.url}
                                alt={`${i} Slide`}
                            />
                        ))
                    }
                </Carousel>
            </div>
            <div className="detailsBlock">
                <div className="detailsBlock-1">
                    <h1>{product.name}</h1>
                    <p>ProductId #{product._id}</p>
                </div>
                <div className="detailsBlock-2">
                    <ReactStars {...options} />
                    <span>({product.numOfReviews} Reviews)</span>
                </div>
                <div className="detailsBlock-3">
                    <h2>{`₹${product.price}`}</h2>
                    <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-2">
                            <button className='negative' onClick={handleDecrement}>-</button>
                            <input className="unitInput" value={itemsCount} type="number" readOnly/>
                            <button className='positive' onClick={handleIncrement}>+</button>
                        </div>{" "}
                        <div className="buttonSet">
                            <button className="addToCart" onClick={addToCartHandler}><b>ADD TO CART</b></button>
                            <button className="buyNow"><b>BUY NOW</b></button>
                        </div>
                    </div>
                    <p>
                        <b>STATUS:{""}</b>
                        <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                            {product.stock < 1 ? "OUT OF STOCK" : "IN STOCK"}
                        </b>
                    </p>
                </div>
                <div className="detailsBlock-4">
                    <b>DESCRIPTION:</b><p>{product.description}</p>
                </div>
                <button className="submitReview" onClick={reviewHandler}>SUBMIT REVIEW</button>
            </div>
                </div>
                {reviewForm &&
                    <div>
                        <form className='reviewForm'>
                            <p>Your review on this</p>
                            <textarea className="textInput" type="text" value={yourReview} onChange={(e) => setYourReview(e.target.value)}></textarea>
                            <ReactStars
                                count={5}
                                onChange={handleRatingChange}
                                size={24}
                                activeColor="#ffd700"
                            />
                            <button className="btn" onClick={()=>submitReviewHandler(product._id)}>Submit</button>
                            <button className="btn" onClick={() => setReviewForm(false)}>Cancel</button>
                        </form>
                    </div>
                }
                <h3 className="reviewsHeading">REVIEWS</h3>
                {product.reviews && product.reviews[0] ? (
                    <div className="reviews">
                    {product.reviews && product.reviews.map((each)=> <ReviewCard review={each}/>)}
                    </div>
                ) : (<div className="noReviews">
                        <button className="firstButton">Be the first to review</button>
                </div>)}
    </Fragment>
  )
}

export default ProductDetails;