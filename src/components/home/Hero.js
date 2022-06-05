import React from 'react';
import './style.css';


const Hero = (props) => {

    const componentStyle = {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        height: 685,
        backgroundImage: 'url("https://oddfaceforever.com/wp-content/uploads/2019/08/S1-2-1.jpg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        marginBottom: 50,
}

    return (
        <div style={componentStyle} className='hero'>
            <div className='app-container'>
                <div className='hero-txt'>
                <h1 className='hero-txt'>Stay ODD</h1>
                </div>
            </div>
        </div>
    );
};


export default Hero;