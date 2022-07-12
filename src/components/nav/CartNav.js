import React, { useState } from 'react';
import Cart from '../cart/Cart';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Link } from 'react-router-dom';

const CartNav = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
    const [isCartVisible, setCartVisible] = useState(false);
  
    const renderOpenButton = () => (
      <div>
      <button className="nav-cart-btn">
        {cart.total_items === 0 ? <ShoppingBagOutlinedIcon style={{color:"#202020"}}/> : 
        cart.total_items > 3 ? <Link to="/cart-view"><ShoppingBagIcon style={{color:"#202020"}} /></Link> 
        : <ShoppingBagIcon style={{color:"#202020"}}/>}
        {cart !== null && cart.total_items < 4 ? <span className='nav-cart-total'>{cart.total_items}</span> : 
        cart.total_items > 3 ? <Link to="/cart-view"><span className='nav-cart-total'>{cart.total_items}</span></Link> :
        ''}
      </button>
      </div>
    );
  
    const renderCloseButton = () => (
      <button className="nav-cart-btn bag-btn">
        <ShoppingBagOutlinedIcon style={{color:"#202020"}}/>
      </button>
    );

  
    return (
      <div className="nav">
      <div className="nav-cart" onClick={() => setCartVisible(!isCartVisible)}>
          { !isCartVisible ? renderOpenButton() : renderCloseButton() }
      </div>
        { isCartVisible ?
          <Cart
            cart={cart}
            onUpdateCartQty={onUpdateCartQty}
            onRemoveFromCart={onRemoveFromCart}
            onEmptyCart={onEmptyCart}
          />
          :
          null
        }  
      </div>
    );
  };
  
  export default CartNav;