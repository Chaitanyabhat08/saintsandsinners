import React from 'react';
import profilePng from "../../images/account.png"
import ReactStars from 'react-rating-stars-component';

const ReviewCard = ({ review }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "Tomato",
        size: window.innerWidth < 400 ? 15 : 20,
        value: review.rating,
        isHalf: true
    }
  return (
    <div className="reviewCard" style={{ height:'auto', width:'auto' }}>
          <img src={profilePng} alt="user" />
          <p>{review.name}</p>
          <ReactStars {...options} />
      <p style={{whiteSpace:'pre-wrap'}}>
        {review.comment}
      </p>
    </div>
  )
}

export default ReviewCard