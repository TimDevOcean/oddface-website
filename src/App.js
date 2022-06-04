import React, { useState, useEffect } from 'react';
import commerce from './lib/commerce';
import ProductsList from './components/product/ProductsList';
import NavBar from './components/nav/NavBar';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Checkout from './components/checkout/Checkout';




const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetchProducts();
    fetchCart();
    console.log(commerce);
  }, []);

  const fetchProducts = () => {
    commerce.products.list().then((products) => {
      setProducts(products.data);
    }).catch((error) => {
      console.log('There was an error fetching the products', error)
    });
  }

  const handleAddToCart = (productId, quantity) => {
    commerce.cart.add(productId, quantity).then((item) => {
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
      <Route path="/" element={<h6>Home</h6>} />
      <Route path="/shop" element={
        <>
        <Header title="Shop" />
        <div className='app-container'>
          <ProductsList 
            products={products}
            onAddToCart={handleAddToCart}
          />
        </div>
        </> }
      />
      <Route path="/checkout" element={
        <>
        <Header title="Checkout" />
        <div className='app-container'>
          <Checkout 
          
          />
        </div>
        </> }
      />
    </Routes>
    </div>
  );
  
};

export default App;