import React, { useState } from 'react';
import Cart from '../cart/Cart';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ShoppingBagSharpIcon from '@mui/icons-material/ShoppingBagSharp';
import Loader from '../loader/Loader';


const CartNav = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
    const [isCartVisible, setCartVisible] = useState(false);
  
    const renderOpenButton = () => (
      <div>
      <button className="nav-cart-btn">
        {cart.total_items === 0 ? <ShoppingBagOutlinedIcon /> : <ShoppingBagSharpIcon />}
        {cart !== null ? <span className='nav-cart-total'>{cart.total_items}</span> : ''}
      </button>
      <div className="cart-loader" ><Loader/></div>
      </div>
    );
  
    const renderCloseButton = () => (
      <button className="nav-cart-btn">
        <ShoppingBagOutlinedIcon />
      </button>
    );
  
    return (
      <div className="nav">
      <div className="nav-cart" onClick={() => setCartVisible(!isCartVisible)}>
          { !isCartVisible ? renderOpenButton() : renderCloseButton() }
      </div>
        { isCartVisible &&
          <Cart
            cart={cart}
            onUpdateCartQty={onUpdateCartQty}
            onRemoveFromCart={onRemoveFromCart}
            onEmptyCart={onEmptyCart}
          />
        }  
      </div>
    );
  };
  
  export default CartNav;