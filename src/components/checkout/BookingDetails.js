import React from "react";
import {
  List,
  ListItem,
  Typography,
  ListItemText,
} from "@mui/material";

const BookingDetails = ({ checkoutData, handleBackStep, handleNextStep }) => (
  <>
    <List>
      {checkoutData.live.line_items.map((item) => (
        <ListItem key={item.id}>
          <ListItemText
            primary={item.name}
            secondary={`Quantity: ${item.quantity}`}
          />
          <Typography variant="body2">
            {item.line_total.formatted_with_symbol}
          </Typography>
        </ListItem>
      ))}
      <ListItem>
        <ListItemText primary="Total price" />
        <Typography variant="body2">
          {checkoutData.live.subtotal.formatted_with_code}
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
);

export default BookingDetails;