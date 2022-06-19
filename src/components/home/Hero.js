import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';


const Hero = (props) => {

    const componentStyle = {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        height: 685,
        backgroundImage: 'url("https://oddfaceforever.com/wp-content/uploads/2022/06/of-hero-2.jpeg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        marginBottom: 50,
}

    return (
        <div style={componentStyle} className='hero'>
            <div className='app-container'>
                <div className='hero-txt'>
                    <h1>Stay ODD</h1>
                    <h2>-<span className="highlight">O</span>riginal</h2>
                    <h2>-<span className="highlight">D</span>aring</h2>
                    <h2>-<span className="highlight">D</span>ifferent</h2><br />
                    &nbsp;
                    <Link className='product-view-cart-btn' to="/shop">Shop Now</Link>
                </div>
            </div>
        </div>
    );
};


export default Hero;