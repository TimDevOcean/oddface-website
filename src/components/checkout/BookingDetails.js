import React from "react";
import {
  List,
  ListItem,
  Typography,
  ListItemText,
  Divider,
} from "@mui/material";

const BookingDetails = ({ user, checkoutData, handleBackStep, handleNextStep }) => {

  const shippingCostRaw = user.shippingOption.price;
  const shippingCost = shippingCostRaw.toFixed(2);
  const currency = checkoutData.live.currency.symbol;
  const totalRaw = checkoutData.live.subtotal.raw + shippingCostRaw;
  const totalPrice = totalRaw.toFixed(2);

  console.log(checkoutData);
  
  return (
  <>
    <List>
      {checkoutData.live.line_items.map((item) => (
        <ListItem key={item.id}>
          <ListItemText
            primary={item.name}
            secondary={`
              ${item.quantity}
              ${item.selected_options[0].option_name}
              - ${item.selected_options[1].option_name}
            `}
          />
          <Typography variant="body2">
            {item.line_total.formatted_with_symbol}
          </Typography>
        </ListItem>
      ))}
      <Divider />
      <ListItem>
        <ListItemText primary="Shipping Cost"
          secondary={`${user.shippingOption.name}`}
        />
        <Typography variant="body2">
          {`${currency}${shippingCost}`}
        </Typography>
      </ListItem>
      <ListItem>
        <ListItemText primary="Total Price" />
        <Typography variant="body2">
          {/* {checkoutData.live.subtotal.formatted_with_code} */}
          {`${currency}${totalPrice}`}
        </Typography>
      </ListItem>
    </List>

    <div className="actions">
      <button
        onClick={(e) => handleBackStep(e, "order-address")}
      >
        Go Back
      </button>
      <button
        onClick={(e) => handleNextStep(e, "order-payment")}
      >
        Next
      </button>
    </div>
  </>
  )
};

export default BookingDetails;