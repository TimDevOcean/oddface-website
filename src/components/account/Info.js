import React from "react";
import {
  Container,
} from "@mui/material";
import "./style.css";
import InfoForm from "./InfoForm";



const Info = ({customer, handleChange, handleSubmit}) => {


  return (
    <div className="customer-info">
      <Container className="checkout-container">
          <InfoForm 
            customer={customer}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
      </Container>
    </div>
  );
};

export default Info;