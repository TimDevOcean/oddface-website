import "./style.css";
import { Link } from 'react-router-dom';
import Cart from './Cart';
import CartItem from './CartItem';
import PropTypes from 'prop-types';
import {
    Paper,
    Grid,
    Container,
    LinearProgress,
} from "@mui/material";


const CartView = ({ cart, onRemoveFromCart, onEmptyCart, onUpdateCartQty }) => {
  
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
      <div><h3 className="cart-total-title">Subtotal</h3></div>
      <div><span className="cart-total-price">{cart.subtotal.formatted_with_symbol}</span></div>
    </div>
  );


if (!cart.id){ 

    return (
        <Container className="cart-view">
            <Paper className="paper" elevation={3}>
            <LinearProgress sx={{ color: '#b00000' }} color="inherit" />
            </Paper>
        </Container>
    )
}

    return (
        <Container className="cart-view">
            <Paper className="paper" elevation={3}>
            <Grid container>
            <Grid item md={8} className="left">
                { renderEmptyMessage() }
                { renderItems() }
            </Grid>
            <Grid item md={4} className="right">
                { renderTotal() }
                <div className="cart-total-footer">
                    <button className="cart-btn-empty" onClick={handleEmptyCart}>Clear Cart</button>
                    <Link to="/checkout" className="cart-btn-checkout">Checkout</Link> 
                </div>
            </Grid>
            </Grid>
            </Paper>
        </Container>
    )  
  
};

Cart.propTypes = {
    cart: PropTypes.object,
    onEmptyCart: () => {},
};

  

export default CartView;