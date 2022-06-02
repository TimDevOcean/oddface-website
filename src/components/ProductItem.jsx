import React from "react";
import PropTypes from 'prop-types';

const ProductItem = ({ product, onAddToCart }) => {

  const handleAddToCart = () => {
    onAddToCart(product.id, 1);
  }

  return (
    <div className="product-card">
      <img className="product-image" src={product.image?.url} alt={product.name} />
      <div className="product-info">
        <h4 className="product-name">{product.name}</h4>
        <p className="product-description" dangerouslySetInnerHTML={{__html:product.description}}/>
        <div className="product-details">
          <p className="product-price">
            {product.price.formatted_with_symbol}
          </p>
          <button name="Add to cart" className="product__btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div> 
  );
};

ProductItem.propTypes = {
  product: PropTypes.object,
};

export default ProductItem;