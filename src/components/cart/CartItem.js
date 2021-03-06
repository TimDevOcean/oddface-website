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

    const colorVariant = item.selected_options[1]?.group_name;
    const sizeVariant = item.selected_options[0]?.group_name;
    const selectedColor = item.selected_options[1]?.option_name;
    const selectedSize = item.selected_options[0]?.option_name;

    return (
        <div className="cart-item">
        <img className="cart-item-image" src={item.image.url} alt={item.name} />
        <div className="cart-item-details">
            <h6 className="name">{item.name}</h6>
            {item.selected_options.length ?
            <div className='variants'>{`${colorVariant}:`} {selectedColor} &nbsp;|&nbsp; {`${sizeVariant}:`} {selectedSize}</div>
            : null
            }
            <div className="qty">
            <button onClick={() => item.quantity > 1 ? handleUpdateCartQty(item.id, item.quantity - 1) : handleRemoveFromCart()}>-</button>
                <p>{item.quantity}</p>
            <button onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>+</button>
            </div>
            <div className="price">{item.line_total.formatted_with_symbol}</div>
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