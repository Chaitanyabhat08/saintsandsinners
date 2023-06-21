import React from 'react';
import './Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <div className="slideshow">
        <div className="slide" style={{ "background-image": `url('https://img.freepik.com/premium-psd/black-friday-sale-social-media-post-instagram-post-web-banner-facebook-cover-template_220443-1074.jpg')` }}></div>
        <div className="slide" style={{ "background-image": `url('https://img.freepik.com/free-vector/fashion-sale-with-discount-template_23-2148936503.jpg')` }}></div>
        <div className="slide" style={{ "background-image": `url('https://content.wepik.com/statics/2897958/fashion-banner-blog-9182393page1.jpg')` }}></div>
      </div>
      <div className="content">
        <h2 className="heading">Limited Time Offer!</h2>
        <p className="subheading">Get 20% off on all clothing items</p>
        <p className="coupon-code">Use coupon code CLOTHING20 at checkout</p>
        <a className="btn-shop" href="/products/getAllProducts">Shop Now</a>
      </div>
    </div>
  );
};

export default Banner;
