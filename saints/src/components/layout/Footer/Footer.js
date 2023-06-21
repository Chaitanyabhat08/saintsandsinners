import React from 'react';
import instagramLogo from '../../../images/image.png';
import logo from '../../../images/logo3.jpeg';
import './Footer.css';

const Footer = () => {
    return (
        <footer id='footer'>
            <div className='left'>
                <h4> Connect to Us on Instagram</h4>
                <p>Order Through Instagram too</p>
                <img className ='igLogo' href="www.instagram.com" src={instagramLogo} alt='instagram' />
            </div>  
            <div className="mid">
                <img src={logo} alt="LogoOFs&s"/>
                <p>Your fashion Our Clothes</p>
                <p>
                    Copyright &copy;  <a href = 'https://www.instagram.com/_chaitanyabhat08_/' >@Chaish Bhat </a>
                </p>
            </div>
            <div className='right'>
                <h4>Thanks to the creators of S&S</h4>
                <a href='www.gmail.com/chaitanyabhat08@gmail.com'> Chaitanya Bhat</a>
            </div>
        </footer>
  )
}

export default Footer;