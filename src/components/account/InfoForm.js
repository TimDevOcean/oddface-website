import React from 'react';

import {
    Grid,
    TextField,
  } from "@mui/material";
  
  const InfoForm = ({
    customer = {},
    handleChange,
    handleSubmit,
  }) => {

return (
    <form className="" onSubmit={handleSubmit} autoComplete="off">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="standard"
            required
            fullWidth
            id="first-name"
            name="firstname"
            label="First Name"
            value={customer.firstname || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="standard"
            required
            fullWidth
            id="last-name"
            name="lastname"
            label="Last Name"
            value={customer.lastname || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="standard"
            required
            fullWidth
            id="email"
            name="email"
            type="email"
            label="Email"
            value={customer.email || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="standard"
            required
            fullWidth
            id="phone"
            name="phone"
            type="phone"
            label="Phone"
            value={customer.phone || ''}
            onChange={handleChange}
          />
        </Grid>  
      </Grid><br /><br />
      <button onClick={handleSubmit} className="product-view-cart-btn" type="submit">
        Update
      </button>
    </form>
  );
}  
  export default InfoForm;