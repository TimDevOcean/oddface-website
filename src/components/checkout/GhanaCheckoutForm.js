import {
  Grid,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Link } from "react-router-dom";

const GhanaCheckoutForm = ({
  user = {},
  orderInfo,
  handleChange,
  handleSubmit,
  checkoutData,
  handleSelectChange,
  handleShippingOptionChange
}) => {
  return (
  <form className="checkout-form" onSubmit={handleSubmit} autoComplete="off">
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="standard"
          required
          fullWidth
          id="first-name"
          name="firstName"
          label="First Name"
          value={user.firstName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="standard"
          required
          fullWidth
          id="last-name"
          name="lastName"
          label="Last Name"
          value={user.lastName}
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
          value={user.email}
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
          value={user.phone}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="standard"        
          required
          fullWidth
          id="address"
          name="address"
          value={user.address}
          label="Physical / Digital Address"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="standard"
          required
          fullWidth
          id="city"
          name="city"
          label="City"
          value={user.city}
          onChange={handleChange}
        />
      </Grid>

      <Grid className="hide" item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="shipping-country-select-label">
            Shipping Country
          </InputLabel>
          <Select
            variant="standard"
            required
            name="shippingCountry"
            id="shipping-country-select"
            value={user.shippingCountry.code || ""}
            labelId="shipping-country-select-label"
            onChange={(e) => handleSelectChange(e, "shippingCountries")}
          >
              <MenuItem value={user.shippingCountries[83].code}>
                {user.shippingCountries[83].name}
              </MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="shipping-subdivision-select-label">
            Shipping Subdivision
          </InputLabel>
          <Select
            variant="standard"
            required
            name="shippingSubdivision"
            id="shipping-subdivision-select"
            labelId="shipping-subdivision-select-label"
            value={user.shippingSubdivision.code || ""}
            onChange={(e) => handleSelectChange(e, "shippingSubdivisions")}
          >
            {user.shippingSubdivisions.map((subdivision) => (
              <MenuItem key={subdivision.code} value={subdivision.code}>
                {subdivision.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="shipping-options-select-label">
            Shipping Options
          </InputLabel>
          <Select
            variant="standard"
            required
            name="shippingOptions"
            value={user.shippingOption.id}
            id="shipping-options-select"
            labelId="shipping-options-select-label"
            onChange={(e) => handleShippingOptionChange(e)}
          >
            {user.shippingOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {`${option.description} - (${option.price.formatted_with_symbol})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>

    <div className="actions">
      <Link to="/cart">
        Go Back
      </Link>
      <button type="submit">
        Next
      </button>
    </div>
  </form>
  )
};

export default GhanaCheckoutForm;