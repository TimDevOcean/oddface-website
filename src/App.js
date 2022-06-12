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
import Footer from "./components/Footer";
import "./App.css";
import CartView from './components/cart/CartView';
import { Grid } from '@mui/material';

const App = () => {
  const [categories, setCategories] = useState('');
  const [cart, setCart] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const [orderError, setOrderError] = useState("");
  const [loading, setLoading] = useState(true);


  const fetchProductsPerCategory = async () => {
    const { data: products } = await commerce.products.list({ limit: 200 });
    const { data: categories } = await commerce.categories.list();
    const productsPerCategory = categories.reduce((acc, category) => {
      return [
        ...acc,
        {
          ...category,
          productsData: products.filter((product) =>
            product.categories.find((cat) => cat.id === category.id)
          ),
        },
      ];
    }, []);

    setCategories(productsPerCategory);
  };

  const handleAddToCart = (productId, quantity, option = {}) => {
    setLoading(true);
    commerce.cart.add(productId, quantity, {...option,}).then((item) => {
      setCart(item.cart);
      setLoading(false);
    }).catch((error) => {
      console.error('There was an error adding the item to the cart', error);
    });
  }

  const fetchCart = () => {
    setLoading(true);
    commerce.cart.retrieve().then((cart) => {
      setCart(cart);
      if(!cart){
        setLoading(true);
      } else {        
        setLoading(false);
      }
    }).catch((error) => {
      console.log('There was an error fetching the cart', error);
    });
  }

  const handleRemoveFromCart = (lineItemId) => {
    setLoading(true);
    commerce.cart.remove(lineItemId).then((resp) => {
      setCart(resp.cart);
      setLoading(false);
    }).catch((error) => {
      console.error('There was an error removing the item from the cart', error);
    });
  }

  const handleUpdateCartQty = (lineItemId, quantity) => {
    setLoading(true);
    commerce.cart.update(lineItemId, { quantity }).then((resp) => {
      setCart(resp.cart);
      setLoading(false);
    }).catch((error) => {
      console.log('There was an error updating the cart items', error);
    });
  }

  const handleEmptyCart = () => {
    setLoading(true);
    commerce.cart.empty().then((resp) => {
      setCart(resp.cart);
      setLoading(false);
    }).catch((error) => {
      console.error('There was an error emptying the cart', error);
    });
  }

  const refreshCart = async () => {
    setLoading(true);
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
    setLoading(false);
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
    fetchProductsPerCategory();
    fetchCart();
  }, []);

  return (
    <div className="app">
    <Grid container className='loader-container'>
      <Grid container item md={1}>
        <Grid item />
      </Grid>
      <Grid container item md={10}>
        <Grid item />
      </Grid>
      <Grid container item md={1}>
        <Grid item className="cart-loader">{loading && <Loader />}</Grid>
      </Grid>
    </Grid>
      <NavBar 
        cart={cart}
        onUpdateCartQty={handleUpdateCartQty}
        onRemoveFromCart={handleRemoveFromCart}
        onEmptyCart={handleEmptyCart}
      />
  
    <Routes>
      
      <Route path="/" element={
        <main>
        <Home />
        </main>
      } />
    
      <Route path="/shop" element={
        <>
        <Header title="Shop" />
        <div className='app-container'>
        <main>
        {categories === '' ? 
          <Loader /> :
          <Shop 
            categories={categories}
            onAddToCart={handleAddToCart}
          />
        }
        </main>
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

      <Route path="/cart-view" element={
        <>
        <Header title="Your Cart" />
        <main>
        <div className='app-container'>
          <CartView
            cart={cart}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveFromCart={handleRemoveFromCart}
            onEmptyCart={handleEmptyCart}
          />
        </div>
        </main>
        </> }
      />

      <Route path="/checkout" element={
        <>
        <Header title="Checkout" />
        <div className='app-container'>
        <main>
          <Checkout 
              orderInfo={orderInfo}
              orderError={orderError}
              cart={cart}
              handleCheckout={handleCheckout}
          />
        </main>
        </div>
        </> }
      />
    </Routes>
    <Footer />
    </div>
  );
  
};

export default App;