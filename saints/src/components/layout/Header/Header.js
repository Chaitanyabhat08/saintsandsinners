import React from 'react';
import { ReactNavbar } from "overlay-navbar";
import {MdAccountCircle } from "react-icons/md";
import {MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import logo from "../../../images/logo3.jpeg";
import './Header.css'

const Header = () => {
    return (
        <ReactNavbar
            profileIcon={true}
            profileIconColor="gray"
            ProfileIconElement={MdAccountCircle}
            profileIconColorHover="white"
            profileIconUrl='/users/loginUser'
            logoAnimationTime="1"
            searchIcon={true}
            searchIconColor="gray"
            SearchIconElement={MdSearch}
            searchIconColorHover="white"
            cartIcon={true}
            cartIconColor="gray"
            CartIconElement={MdAddShoppingCart}
            cartIconColorHover="white"
            cartIconMargin="15px"
            burgerColor="black"
            burgerColorHover="white"
            logo={logo}
            logoWidth="20vmax"
            navColor1="black"
            logoHoverSize="20px"
            logoHoverColor="black"
            link1Text="Home"
            link2Text="Our Products"
            link3Text="Contact Us"
            link4Text="About Us"
            link1Url="/"
            link2Url='/products/getallProducts'
            link3Url="/contact"
            link4Url="/about"
            link1Size="1.2vmax"
            link1Color="gray"
            nav1justifyContent="flex-end"
            nav2justifyContent="flex-end"
            nav3justifyContent="flex-start"
            link1ColorHover="white"
            link2ColorHover="white"
            link3ColorHover="white"
            link4ColorHover="white"
            link1Margin="2.5vmax"
        />
    );
}
export default Header