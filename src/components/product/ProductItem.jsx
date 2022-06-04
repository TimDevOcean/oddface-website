import React from "react";
import PropTypes from 'prop-types';
import "./style.css";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const ProductItem = ({ product, onAddToCart }) => {

  const handleAddToCart = () => {
    onAddToCart(product.id, 1);
  }

  return (
    <Card sx={{ maxWidth: 500 }} className="product-card">
      <CardMedia component="img" height="500" className="product-image" image={product.image?.url} alt={product.name} />
      <CardContent className="product-info">
        <h4 className="product-name">{product.name}</h4>
        {/* <p className="product-description" dangerouslySetInnerHTML={{__html:product.description}}/> */}
        <div className="product-details">
          <p className="product-price">
            {product.price.formatted_with_symbol}
          </p>
          <Button name="Add to cart" className="product-btn" onClick={handleAddToCart}>
            <ShoppingBagOutlinedIcon className="cart-icon" />
          </Button>
        </div>
      </CardContent>
    </Card> 
  );
};

ProductItem.propTypes = {
  product: PropTypes.object,
};

export default ProductItem;