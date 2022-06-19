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
                <h1>Stay ODD</h1>
                <h2>-<span className="highlight">O</span>riginal</h2>
                <h2>-<span className="highlight">D</span>aring</h2>
                <h2>-<span className="highlight">D</span>ifferent</h2>
                </div>
            </div>
        </div>
    );
};


export default Hero;