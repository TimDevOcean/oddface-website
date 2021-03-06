import React, { useState, useEffect } from 'react';
import commerce from './lib/commerce';
import NavBar from './components/nav/NavBar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Checkout from './components/checkout/Checkout';
import Home from './components/pages/Home';
import ProductView from './components/product/ProductView';
import Shop from './components/shop/Shop';
import Loader from "./components/loader/Loader";
import Footer from "./components/Footer";
import "./App.css";
import CartView from './components/cart/CartView';
import { Grid } from '@mui/material';
import Alerter from './components/Alerter';
import 'animate.css';
import Contact from './components/pages/Contact';
import StayOdd from './components/pages/StayOdd';
import Terms from './components/pages/Terms';
import Delivery from './components/pages/Delivery';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import SizeChart from './components/pages/SizeChart';
import Account from './components/pages/Account';
import NavBarMobile from './components/nav/NavBarMobile';
import Login from './components/account/Login';
import Dashboard from './components/account/Dashboard';

const App = () => {
  const [categories, setCategories] = useState('');
  const [cart, setCart] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const [orderError, setOrderError] = useState("");
  const [loading, setLoading] = useState(true);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();


  const [stickyClass, setStickyClass] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', stickNavbar);
    return () => window.removeEventListener('scroll', stickNavbar);
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      // window height changed for the demo
      windowHeight > 40 ? setStickyClass('sticky-nav') : setStickyClass('');
    }
  };



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
      handleAlert("success", "Item added to bag successfully.");
    }).catch((error) => {
      handleAlert("error", "There was an error adding the item to your bag");
      console.error('There was an error adding the item to the bag', error);
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
      handleAlert("success", "Item removed from bag.");
    }).catch((error) => {
      handleAlert("error", "There was an error removing the item from bag");
      console.error('There was an error removing the item from the bag', error);
    });
  }

  const handleUpdateCartQty = (lineItemId, quantity) => {
    setLoading(true);
    commerce.cart.update(lineItemId, { quantity }).then((resp) => {
      setCart(resp.cart);
      setLoading(false);
      handleAlert("success", "Quantity updated.");
    }).catch((error) => {
      handleAlert("error", "There was an error updating your bag");
      console.log('There was an error updating your bag items', error);
    });
  }

  const handleEmptyCart = () => {
    setLoading(true);
    commerce.cart.empty().then((resp) => {
      setCart(resp.cart);
      setLoading(false);
      handleAlert("success", "Bag emptied successfully.");
    }).catch((error) => {
      handleAlert("error", "There was an error emptying your bag.");
      console.error('There was an error emptying your bag', error);
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
    <Grid container className={`loader-container ${stickyClass}`}>
      <Grid container xs={4} item md={1}>
        <Grid item />
      </Grid>
      <Grid container xs={4} item md={10}>
        <Grid item />
      </Grid>
      <Grid container item xs={4} md={1}>
        <Grid item className="cart-loader">{loading && <Loader />}</Grid>
      </Grid>
    </Grid>
      <NavBar 
        cart={cart}
        onUpdateCartQty={handleUpdateCartQty}
        onRemoveFromCart={handleRemoveFromCart}
        onEmptyCart={handleEmptyCart}
      />
      <NavBarMobile 
        cart={cart}
        onUpdateCartQty={handleUpdateCartQty}
        onRemoveFromCart={handleRemoveFromCart}
        onEmptyCart={handleEmptyCart}
      />

  
    <Routes>
      
      <Route path="/" element={
          <Home />
      } />
    
      <Route path="/shop" element={
        <>
        <Header title="Shop" />
        <main>
          <div className='app-container'>
            {/* <Alerter type={alertType} message={alertMessage} /> */}
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

      <Route path="/stay-odd" element={
        <>
          <Header title="Stay ODD" />
          <StayOdd />
        </>
      } />

      <Route path="/contact" element={
        <>
          <Header title="Contact" />
          <Contact />
        </>
      } />

      <Route path="/account/:loginToken" element={
        <>
          <Header title="Your Account" />
          <Account component={<Dashboard />} />
        </>
      } />

      <Route path="/account" element={
        <>
          <Header title="Your Account" />
          <Account component={<Dashboard />} />
        </>
      } />

      <Route path="/account/login" element={
        <>
          <Header title="Login" />
          <Account component={<Login />} />
        </>
      } />

      <Route path="/terms" element={
        <>
          <Header title="Terms & Conditions" />
          <Terms />
        </>
      } />

      <Route path="/delivery" element={
        <>
          <Header title="Delivery & Returns" />
          <Delivery />
        </>
      } />

      <Route path="/size-chart" element={
        <>
          <Header title="Size Chart" />
          <SizeChart />
        </>
      } />


      <Route path="/privacy-policy" element={
        <>
          <Header title="Privacy Policy" />
          <PrivacyPolicy />
        </>
      } />


      <Route path="/product-view/:id" element={
        <>
        <Header title="Shop" />
        <main>
          <div className='app-container'>
            <Alerter 
              type={alertType} 
              message={alertMessage} 
              btnText={"View Bag"}
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