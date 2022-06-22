import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link } from 'react-router-dom';

let year = new Date().getFullYear();

const Footer = () => {

    return (
        <div className='footer'>

            <div className='app-container'>
                <div className='footer-top'>
                    <a href="https://www.instagram.com/oddfaceforever/" target="_blank" rel='noreferrer'><InstagramIcon /></a> 
                    <a href="https://www.facebook.com/oddfaceforever/" target="_blank" rel='noreferrer'><FacebookIcon /></a>
                    <a href="https://wa.me/233554834613" target="_blank" rel='noreferrer'><WhatsAppIcon /></a>
                </div>

                <div className='footer-middle'>
                    <Link to="/account"><span>My Account</span></Link>• 
                    <Link to="/cart-view"><span>My Bag</span></Link>•
                    <Link to="/checkout"><span>Checkout</span></Link>•
                    <Link to="/size-chart"><span>Size Chart</span></Link><br />

                    <Link to="/delivery"><span>Delivery & Returns</span></Link>•
                    <Link to="/terms"><span>Terms & Conditions</span></Link>•
                    <Link to="/privacy-policy"><span>Privacy Policy</span></Link>  
                </div>

                <hr></hr>
                <div className='footer-bottom'>
                    <span>© {year} &nbsp;O D D F A C E</span><br></br>
                    <span>All rights reserved.</span>
                </div>
            </div>
            
        </div>
    );
};


export default Footer;