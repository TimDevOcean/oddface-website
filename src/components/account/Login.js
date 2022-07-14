import React, { useState } from 'react';
import commerce from '../../lib/commerce';
import {
    Grid,
    TextField,
    Container,
    Paper,
} from "@mui/material";
import "./style.css";

export const Login = () => {

const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    commerce.customer.login(email, 'http://192.168.0.102:3000/account').then((token) => console.log(token));
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };
    
  return (
    <div className='app-container'>
        <main>
        <Container className='account'>
          <Paper className="paper" elevation={3}>
            <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                        variant="standard"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        onChange={handleChange}
                        />
                    </Grid>
                </Grid><br/>
                <button type="submit" className='product-view-cart-btn'>
                    Login
                </button>
            </form> 
          </Paper>
        </Container>       
        </main>
    </div>
  )
}

export default Login;
