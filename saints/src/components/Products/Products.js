import React, { Fragment, useEffect, useState } from 'react';
import './Products.css';
    
import { useSelector, useDispatch } from 'react-redux';
import { useParams} from 'react-router-dom';
import { clearErrors, getProduct } from '../../actions/productActions';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import Product from "../Home/ProductCard";
import Pagination from 'react-js-pagination';
import MetaData from '../layout/MetaData';
import { Input } from '@mui/material';

import { Typography, Slider } from '@material-ui/core';
import { Tooltip, Select } from 'antd';
const Option = Select;

const categories = [
    { name: "Tshirts", code: "Tshirt" },
    { name: "Gadgets", code:"Gadgets"},
    { name: "Sweatshirts", code: "SweatShirts" },
    { name: "Shirts", code: "Shirts" },
    { name: "Pants", code: "Pants" },
    { name: "Kurtis", code: "Kurtis" },
    { name: "Sweatpants", code: "SweatPants" },
    { name: "Caps", code: "Capes" },
    { name: "Socks", code: "Socks" },
    { name: "Active Wear", code:"ActiveWear" }
]
const Ratings = [
    { name:'4.5 and above',value:'4.5'},
    { name: '4 & above', value: '4' },
    { name: '3 and above', value: 3 },
    { name:'All',value: 0}
]
const Products = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 3000]);
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [sortOpt, SetSortOpt] = useState('Recommended');
    const [rating, setRating] = useState();
    const [genderSelected, setGenderSelected] = useState();
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }
    const handlegender = (e) => {
        setGenderSelected(e.target.value);

    }
    const priceHandler = (e,newPrice) => {
        setPrice(newPrice);
    }
    function removeFilters (){
        setCurrentPage(1);
        setPrice([0, 3000]);
        setCategoryFilter(null);
        setRating();
    }
    const { loading, error, products, productsCount, resultPerPage } = useSelector(state => state.products);

    const { keyWord,category,gender } = useParams();
    // const category = decodeURIComponent(new URLSearchParams(location.search).get('category'));
    // const gender = decodeURIComponent(new URLSearchParams(location.search).get('gender'));
    useEffect(() => {
        if (error) { 
            alert.show(error);
            dispatch(clearErrors());
        }
        if (category!=='All' || gender!=='null') {
            dispatch(getProduct(keyWord, currentPage, price, category, rating, gender))
        } else {
            dispatch(getProduct(keyWord, currentPage, price, categoryFilter,rating,genderSelected));
        }
    }, [dispatch, keyWord, currentPage, price, category, rating, categoryFilter, error, alert, gender, genderSelected]);

    
    const menuItems = [
        { h6: 'Recommended', value: 'RECOM' },
        { h6: 'Whats new?', value: 'WHN' },
        { h6: 'Popularity', value: 'POP' },
        { h6: 'Price: Low-high', value: 'PLH' },
        { h6: 'Price: High-low', value: 'PHL' },
        // ...
    ];
    return (
        <Fragment>
            {
                loading ? <Loader /> :
                    <Fragment>
                        <div className='titleSec'>
                            <MetaData title="Our Products" />
                            <h1 className="productsHeading">Our Products</h1>
                        </div>
                        <div className='sort'>
                            <div className="sortbyBox">
                            <Typography>Sort by:</Typography>
                            <Select
                                name='SORT BY'
                                value={sortOpt}
                                style={{ width: 200 }}
                                placeholder="Sort By:"
                                onChange={SetSortOpt}
                            >
                                {menuItems.map((menu) => (
                                   <Option key={menu.value} value={menu.value} >
                                        <Tooltip placement='top' title={menu.h6}>{menu.h6}</Tooltip>
                                    </Option>
                                ))}
                                </Select>
                            </div>    
                            <div className="ratingsBox">
                                <Typography component="legend">Ratings</Typography>
                                <Select
                                    name='Ratings'
                                    value={rating}
                                    style={{ width: 200 }}
                                    placeholder="Select Ratings"
                                    onChange={setRating}
                                >
                                    {Ratings.map((rating) => (
                                        <Option key={rating.value} value={rating.value}>
                                            <Tooltip placement='top' title={rating.name}>{rating.name}⭐</Tooltip>
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <div className="categoryBox">
                                <Typography>Category</Typography>
                                <Select
                                    name='Categories'
                                    value={categoryFilter}
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Select a Category"
                                    onChange={setCategoryFilter}
                                >
                                    {categories.map((category) => (
                                        <Option key={category.code} value={category.code}>
                                            <Tooltip placement='top' title={category.name}>{category.name}</Tooltip>
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <div className='MainSec'>
                            <div className="filterBox">
                                <div className='genderSelection'> 
                                        <div>
                                            <h6 for="noinput">
                                                All
                                            </h6>
                                        <Input type="radio" name="radios" id="noinput" value="All" checked={genderSelected === 'All'}
                                        onChange={handlegender} ></Input>
                                        </div>
                                        <div >
                                            <h6 for="meninput">
                                                Men
                                            </h6>
                                        <Input type="radio" name="radios" id="meninput" value="M" checked={genderSelected === 'M'}
                                            onChange={handlegender}></Input>
                                        </div>
                                        <div>
                                            <h6 for="womeninput">
                                                Women
                                            </h6>
                                        <Input type="radio" name="radios" id="womeninput" value="F" checked={genderSelected === 'F'}
                                            onChange={handlegender}></Input>
                                        </div>
                                        <div>
                                            <h6 for="kidsinput">
                                               Kids
                                            </h6>
                                        <Input type="radio" name="radios" id="kidsinput" value="K" checked={genderSelected === 'K'}
                                            onChange={handlegender}></Input>
                                        </div>
                                </div>
                                <div>
                                <hr />
                            <Typography>Price</Typography>
                                <Slider
                                className="priceSlider"
                                value={price}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                onChange={priceHandler}
                                min={0}
                                max={3000}
                                step={50}
                                    />
                                </div>
                                 <hr />
                        <div className="discountSec">
                        <h5 className="heading">Discount Range</h5>
                            <div>
                            <Input type="radio" name="exampleRadios" id="exampleRadios1" value="option1" ></Input>
                                <h6 for="exampleRadios1">
                                10% ABOVE
                                </h6>
                            </div>
                            <div >
                                <Input type="radio" name="exampleRadios" id="exampleRadios2" value="option2"></Input>
                                    <h6 for="exampleRadios2">
                                    20% ABOVE
                                    </h6>
                            </div>
                            <div >
                                <Input type="radio" name="exampleRadios" id="exampleRadios3" value="option3" ></Input>
                                <h6 for="exampleRadios3">
                            30% ABOVE
                                </h6>
                                    </div>
                            <div >
                                <Input type="radio" name="exampleRadios" id="exampleRadios4" value="option3" ></Input>
                                <h6  for="exampleRadios3">
                            40% ABOVE
                                </h6>
                            </div>
                            <div>
                                <Input type="radio" name="exampleRadios" id="exampleRadios5" value="option3" ></Input>
                                <h6 for="exampleRadios3">
                            50% ABOVE
                                </h6>
                            </div>
                            <div>
                                <Input type="radio" name="exampleRadios" id="exampleRadios6" value="option3" ></Input>
                                <h6 for="exampleRadios3">
                            60% ABOVE
                                </h6>
                            </div>
                            </div>
                                <hr />
                                <div>
                                    <button className="clearFilters" type="button" onClick={removeFilters}><b>Clear Filters</b></button>
                                </div>
                            </div>
                        <div className="products">
                            {products && products.map((product) =>
                                <Product key={product._id} product={product}/>
                            )}
                        </div>
                    </div>
                        { resultPerPage > 8 ?
                            <div className="paginationBox">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Previous"
                                    firstPageText="First"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>:<div></div>
                        }
                    </Fragment>
            }
    </Fragment>
  )
}

export default Products