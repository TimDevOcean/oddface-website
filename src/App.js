import React, { useState, useEffect } from 'react';
import commerce from './lib/commerce';
import NavBar from './components/nav/NavBar';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
import Alerter from './components/Alerter';

const App = () => {
  const [categories, setCategories] = useState('');
  const [cart, setCart] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const [orderError, setOrderError] = useState("");
  const [loading, setLoading] = useState(true);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const showAlert = () => {
    var element = document.getElementById("alerter");
    element.classList.add("show");
    setTimeout(()=>{element.classList.remove("show")}, 6000);
  }

  const handleAlert = (type, message) => {
      setAlertType(type);
      setAlertMessage(message);
      showAlert();
  }

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
      handleAlert("success", "Item added to cart successfully.");
    }).catch((error) => {
      handleAlert("error", "There was an error adding the item to the cart");
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
      handleAlert("success", "Item removed from cart.");
    }).catch((error) => {
      handleAlert("error", "There was an error removing the item from cart");
      console.error('There was an error removing the item from the cart', error);
    });
  }

  const handleUpdateCartQty = (lineItemId, quantity) => {
    setLoading(true);
    commerce.cart.update(lineItemId, { quantity }).then((resp) => {
      setCart(resp.cart);
      setLoading(false);
      handleAlert("success", "Quantity updated.");
    }).catch((error) => {
      handleAlert("error", "There was an error updating the cart");
      console.log('There was an error updating the cart items', error);
    });
  }

  const handleEmptyCart = () => {
    setLoading(true);
    commerce.cart.empty().then((resp) => {
      setCart(resp.cart);
      setLoading(false);
      handleAlert("success", "Cart cleared successfully.");
    }).catch((error) => {
      handleAlert("error", "There was an error clearing the cart");
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
      console.log(incomingOrder);

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
        <main>
          <div className='app-container'>
            <Alerter type={alertType} message={alertMessage} />
            {categories === '' ? 
              <Loader /> :
              <Shop 
                categories={categories}
                onAddToCart={handleAddToCart}
              />
            }
          </div>
        </main>
        </> 
        }
      />

      <Route path="/product-view/:id" element={
        <>
        <Header title="Product" />
        <main>
          <div className='app-container'>
            <Alerter 
              type={alertType} 
              message={alertMessage} 
              btnText={"View Cart"}
              onClick={()=>navigate("/cart-view", { replace: true })}
            />
            <ProductView addToCart={handleAddToCart}/>
          </div>
        </main>
        </> }
      />

      <Route path="/cart-view" element={
        <>
        <Header title="Your Bag" />
        <main>
          <div className='app-container'>
            <Alerter type={alertType} message={alertMessage} />
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

      <Route path="/cart" element={
        <>
        <Header title="Your Bag" />
        <main>
          <div className='app-container'>
            <Alerter type={alertType} message={alertMessage} />
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
        <main>
          <div className='app-container'>
            <Alerter type={alertType} message={alertMessage} />
            <Checkout 
                orderInfo={orderInfo}
                orderError={orderError}
                cart={cart}
                handleCheckout={handleCheckout}
            />
          </div>
        </main>
        </> }
      />
    </Routes>
    <Footer />
    </div>
  );
  
};

export default App;