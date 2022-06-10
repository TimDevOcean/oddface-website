import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

let year = new Date().getFullYear();

const Footer = () => {

    return (
        <div className='footer'>

            <div className='app-container'>
                <div className='footer-top'>
                    <InstagramIcon /> <FacebookIcon /> <WhatsAppIcon />
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