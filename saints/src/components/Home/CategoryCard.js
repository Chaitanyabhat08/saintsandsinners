import React from 'react';
import { Link } from "react-router-dom";
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
  const keyword = "";
  return (
    <div className="CategoryDiv">
      <Link className="CategoryCard" to={`/products/getallproducts/${encodeURIComponent(keyword)}?category=${encodeURIComponent(category.code)}&gender=${encodeURIComponent(category.gender)}`}>
        <img src={category.images[0].url} alt={category.name} />
        <p>{category.name}</p>
      </Link>
    </div>
  )
}
export default CategoryCard;