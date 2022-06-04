import { Container, Paper } from '@mui/material';
import React from 'react';
import CheckoutForm from './CheckoutForm';



const Checkout = () => {

    return (
        <div className='checkout'>
            <Container>
                <Paper>
                    <p>Fill in your detail</p>
                    {/* <CheckoutForm /> */}
                </Paper>
            </Container>
        </div>
    );
};


export default Checkout;