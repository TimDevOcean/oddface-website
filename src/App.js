import React, { useState, useEffect } from 'react';
import commerce from './lib/commerce';
import NavBar from './components/nav/NavBar';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Checkout from './components/checkout/Checkout';
import Home from './components/home/Home';
import ProductView from './components/product/ProductView';
import Shop from './components/shop/Shop';
import Loader from "./components/loader/Loader";



const App = () => {
  const [products, setProducts] = useState('');
  const [cart, setCart] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const [orderError, setOrderError] = useState("");

  const fetchProducts = () => {
    commerce.products.list().then((products) => {
      setProducts(products.data);
    }).catch((error) => {
      console.log('There was an error fetching the products', error)
    });
  }

  const handleAddToCart = (productId, quantity, option = {}) => {
    commerce.cart.add(productId, quantity, {...option}).then((item) => {
      setCart(item.cart);
    }).catch((error) => {
      console.error('There was an error adding the item to the cart', error);
    });
  }

  const fetchCart = () => {
    commerce.cart.retrieve().then((cart) => {
      setCart(cart);
    }).catch((error) => {
      console.log('There was an error fetching the cart', error);
    });
  }

  const handleRemoveFromCart = (lineItemId) => {
    commerce.cart.remove(lineItemId).then((resp) => {
      setCart(resp.cart);
    }).catch((error) => {
      console.error('There was an error removing the item from the cart', error);
    });
  }

  const handleUpdateCartQty = (lineItemId, quantity) => {
    commerce.cart.update(lineItemId, { quantity }).then((resp) => {
      setCart(resp.cart);
    }).catch((error) => {
      console.log('There was an error updating the cart items', error);
    });
  }

  const handleEmptyCart = () => {
    commerce.cart.empty().then((resp) => {
      setCart(resp.cart);
    }).catch((error) => {
      console.error('There was an error emptying the cart', error);
    });
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCheckout = async (checkoutId, orderData) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutId,
        orderData
      );

      setOrderInfo(incomingOrder);

      refreshCart();
    } catch (error) {
      setOrderError(
        (error.data && error.data.error && error.data.error.message) ||
          "There is an error"
      );
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <div className="app">
    <div className=''>
      <NavBar 
        cart={cart}
        onUpdateCartQty={handleUpdateCartQty}
        onRemoveFromCart={handleRemoveFromCart}
        onEmptyCart={handleEmptyCart}
      />
    </div>
  
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/shop" element={
        <>
        <Header title="Shop" />
        <div className='app-container'>

        {products === '' ? 
          <Loader /> :
          <Shop 
            products={products}
            onAddToCart={handleAddToCart}
          />
        }
        </div>
        </> 
        }
      />

      <Route path="/product-view/:id" element={
        <>
        <Header title="Product" />
        <div className='app-container'>
          <ProductView addToCart={handleAddToCart}/>
        </div>
        </> }
      />

      <Route path="/checkout" element={
        <>
        <Header title="Checkout" />
        <div className='app-container'>
          <Checkout 
              orderInfo={orderInfo}
              orderError={orderError}
              cart={cart}
              handleCheckout={handleCheckout}
          />
        </div>
        </> }
      />
    </Routes>
    </div>
  );
  
};

export default App;