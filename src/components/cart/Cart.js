import React from 'react';
import CartItem from './CartItem';
import PropTypes from 'prop-types';
import "./style.css";
import { Link } from 'react-router-dom';


const Cart = ({ cart, onRemoveFromCart, onEmptyCart, onUpdateCartQty }) => {

  const handleEmptyCart = () => {
    onEmptyCart();
  }

  const renderEmptyMessage = () => {
    if (cart.total_unique_items > 0) {
      return;
    }

    return (
      <p className="cart-none">
        You have no items in your shopping cart, start adding some!
      </p>
    );
  }

  const renderItems = () => (
    cart.line_items.map((lineItem) => (
      <CartItem
        item={lineItem}
        onUpdateCartQty={onUpdateCartQty}
        onRemoveFromCart={onRemoveFromCart}
        key={lineItem.id}
        className="cart-inner"
      />
    ))
  );

  const renderTotal = () => (
    <div className="cart-total">
      <h6 className="cart-total-title">Subtotal</h6>
      <p className="cart-total-price">{cart.subtotal.formatted_with_symbol}</p>
    </div>
  );

  return (
    <div className="cart">
      { renderEmptyMessage() }
      { renderItems() }
      <div className="cart-footer">
      { renderTotal() }
        <button className="cart-btn-empty" onClick={handleEmptyCart}>Clear Cart</button>
        <Link to="/checkout" className="cart-btn-checkout">Checkout</Link> 
      </div>
    </div>
  );
};

Cart.propTypes = {
    cart: PropTypes.object,
    onEmptyCart: () => {},
};

export default Cart;