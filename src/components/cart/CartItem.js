import React from 'react';
import PropTypes from 'prop-types';

import CloseSharpIcon from '@mui/icons-material/CloseSharp';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  
    const handleUpdateCartQty = (lineItemId, quantity) => {
        onUpdateCartQty(lineItemId, quantity);
    }

    const handleRemoveFromCart = () => {
        onRemoveFromCart(item.id);
    }

    return (
        <div className="cart-item">
        <img className="cart-item-image" src={item.image.url} alt={item.name} />
        <div className="cart-item-details">
            <h6 className="cart-item-details-name">{item.name}</h6>
            <div className="cart-item-details-qty">
            <button type="button" onClick={() => item.quantity > 1 ? handleUpdateCartQty(item.id, item.quantity - 1) : handleRemoveFromCart()}>-</button>
                <p>{item.quantity}</p>
            <button type="button" onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>+</button>
            </div>
            <div className="cart-item-details-price">{item.line_total.formatted_with_symbol}</div>
        </div>
        <button type="button" className="cart-item-remove" onClick={handleRemoveFromCart}>
            <CloseSharpIcon />
        </button>
        </div>
    );
};

CartItem.propTypes = {
    item: PropTypes.object,
};

export default CartItem;