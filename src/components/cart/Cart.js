import React from 'react';
import CartItem from './CartItem';
import PropTypes from 'prop-types';

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
      <p className="cart-total-title">Subtotal:</p>
      <p className="cart-total-price">{cart.subtotal.formatted_with_symbol}</p>
    </div>
  );

  return (
    <div className="cart">
      <h4 className="cart-heading">Your Shopping Cart</h4>
      { renderEmptyMessage() }
      { renderItems() }
      { renderTotal() }
      <div className="cart-footer">
        <button className="cart-btn-empty" onClick={handleEmptyCart}>Empty cart</button>
        <button className="cart-btn-checkout">Checkout</button> 
      </div>
    </div>
  );
};

Cart.propTypes = {
    cart: PropTypes.object,
    onEmptyCart: () => {},
};

export default Cart;