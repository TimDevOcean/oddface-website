import { React, useState, useEffect } from 'react';
import "./style.css";
import CartNav from './CartNav';
import Menu from './Menu';

import { Grid, Container } from "@mui/material";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Link } from 'react-router-dom';


const NavBar = ( { cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart } ) => {

    const [stickyClass, setStickyClass] = useState('');

    useEffect(() => {
      window.addEventListener('scroll', stickNavbar);
      return () => window.removeEventListener('scroll', stickNavbar);
    }, []);
  
    const stickNavbar = () => {
      if (window !== undefined) {
        let windowHeight = window.scrollY;
        // window height changed for the demo
        windowHeight > 40 ? setStickyClass('sticky-nav') : setStickyClass('');
      }
    };

    return (
        <Container className={`nav-bar ${stickyClass}`}>
            <Grid container rowSpacing={0} columnSpacing={0}>
                <Grid container item xs={1} md={1}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Link to="/account" className='nav-account'>
                            <PersonOutlineOutlinedIcon fontSize="inherit" />
                        </Link>
                    </Grid>
                </Grid>
                
                <Grid className='mid-nav' container item xs={10} md={10}>
                    <Grid className='l-menu' item xs={5.5} md={5.5}>
                        <Menu mi1="Home" mi1link="/"
                         mi2="Shop" mi2link="/shop"
                         />
                    </Grid>
                    <Grid className='nav-logo' item xs={1}  md={1}>
                        <Link to="/"><div style={{height:50,width:60,}}></div></Link>
                    </Grid>
                    <Grid className='r-menu' item xs={5.5}  md={5.5}>
                    <Menu mi1="Stay ODD" mi1link="/stay-odd" mi2="Contact" mi2link="/contact" />
                    </Grid>
                </Grid>

                <Grid container item xs={1} md={1}>
                    <Grid item xs={12} sm={12} md={12}>
                        <CartNav 
                            cart={cart}
                            onUpdateCartQty={onUpdateCartQty}
                            onRemoveFromCart={onRemoveFromCart}
                            onEmptyCart={onEmptyCart}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default NavBar;