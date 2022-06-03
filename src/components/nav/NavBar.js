import React from 'react';
import "./style.css";
import CartNav from './CartNav';
import Menu from './Menu';

import { Grid, Container } from "@mui/material";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';


const NavBar = ( { cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart } ) => {

    return (
        <Container className="nav-bar">
            <Grid container rowSpacing={0} columnSpacing={0}>
                <Grid container item xs={12} md={1}>
                    <Grid item xs={12} sm={12} md={12}>
                        <button className='nav-account-btn'>
                            <PersonOutlineOutlinedIcon />
                        </button>
                    </Grid>
                </Grid>
                
                <Grid className='mid-nav' container item xs={12} md={10}>
                    <Grid className='l-menu' item xs={12} sm={12} md={5.5}>
                        <Menu mi1="Home" mi2="Shop"/>
                    </Grid>
                    <Grid className='nav-logo' item xs={12} sm={12} md={1}>
                    
                    </Grid>
                    <Grid className='r-menu' item xs={12} sm={12} md={5.5}>
                    <Menu mi1="Stay ODD" mi2="Contact"/>
                    </Grid>
                </Grid>

                <Grid container item xs={12} md={1}>
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