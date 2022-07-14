import React, { useState } from 'react';
import Cart from '../cart/Cart';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Link } from 'react-router-dom';

const CartNav = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
    const [isCartVisible, setCartVisible] = useState(false);
  
    const renderOpenButton = () => (
      <div>
      <button className="nav-cart-btn">
        {cart.total_items === 0 ? <LocalMallOutlinedIcon style={{color:"#202020"}}/> : 
        cart.total_items > 3 ? <Link to="/cart-view"><LocalMallIcon style={{color:"#202020"}} /></Link> 
        : <LocalMallIcon style={{color:"#202020"}}/>}
        {cart !== null && cart.total_items < 4 ? <span className='nav-cart-total'>{cart.total_items}</span> : 
        cart.total_items > 3 ? <Link to="/cart-view"><span className='nav-cart-total'>{cart.total_items}</span></Link> :
        ''}
      </button>
      </div>
    );
  
    const renderCloseButton = () => (
      <button className="nav-cart-btn bag-btn">
        <LocalMallOutlinedIcon style={{color:"#202020"}}/>
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