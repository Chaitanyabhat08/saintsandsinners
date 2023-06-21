import React, { Fragment, useState } from 'react';
import './Search.css';
import { useNavigate } from "react-router-dom";
import MetaData from '../layout/MetaData';

const Search = () => {
    const [keyWord, setKeyword] = useState("");
    const navigateTo = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyWord.trim()) {
            navigateTo(`/products/getallproducts/${keyWord}`)
        } else {
            navigateTo('/products/getallproducts')
        }
    }
    return (
        <Fragment>
            <MetaData title={`s&s results for ${keyWord}`} />
            <form className="searchBox" onSubmit={searchSubmitHandler}>
            <input type='text' placeholder="Search our products..." onChange={(e) => setKeyword(e.target.value)} />
            <input type='submit' value="Search" />
            </form>
      </Fragment>
  )
}

export default Search