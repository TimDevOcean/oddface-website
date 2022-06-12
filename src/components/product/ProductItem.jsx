import React from "react";
import PropTypes from 'prop-types';
import "./style.css";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Link } from "react-router-dom";

const ProductItem = ({ product, onAddToCart }) => {

  // const handleAddToCart = () => {
  //   onAddToCart(product.id, 1);
  // }

  return (
    <div className="product">
      <Card sx={{ maxWidth: 500 }} className="product-card">
      <Link to={`/product-view/${product.id}`}>
        <CardMedia component="img" height="600" className="product-image" image={product.image?.url} alt={product.name} />
        <CardContent className="product-info">
          <span className="product-name">{product.name}</span>
          {/* <p className="product-description" dangerouslySetInnerHTML={{__html:product.description}}/> */}
          <div className="product-details">
            <p className="product-price">
              {product.price.formatted_with_symbol}
            </p>
            <Button name="Add to cart" className="product-btn">
              <VisibilityOutlinedIcon className="cart-icon" />
            </Button>
          </div>
        </CardContent>
        </Link>
      </Card> 
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object,
};

export default ProductItem;