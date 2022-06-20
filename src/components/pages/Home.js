import { Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Hero from './Hero';



const Home = (props) => {

    return (
        <div className='home'>
            <Hero />
            <div className='app-container'>
            <main>
            <Grid className='main-grid' container spacing={2}>
                <Grid item xs={12} md={4}>
                    <h6>ODDFACE FOREVER</h6>
                    <h2>Uplifting</h2>
                    <h2>Through</h2>
                    <h2>Streetwear</h2>
                    <img alt="ODDFACE" src="https://oddfaceforever.com/wp-content/uploads/2019/08/of-roses.jpg" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <img alt="ODDFACE" src="https://oddfaceforever.com/wp-content/uploads/2019/08/oddfits.jpg" />
                    <p>
                        OddFace Forever is a streetwear brand created to uplift 
                        and inspire people to be different. Stay ODD – 
                        Original, Daring, Different. <br/><br/>
                        <Link className='product-view-cart-btn' to="/stay-odd">Learn More</Link>
                    </p>
                </Grid>
                <Grid style={{paddingTop:125}} item xs={12} md={4}>
                    <img alt="ODDFACE" src="https://oddfaceforever.com/wp-content/uploads/2019/08/tim.jpg" />
                </Grid>
            </Grid>
            </main>
            </div>
        </div>
    );
};


export default Home;