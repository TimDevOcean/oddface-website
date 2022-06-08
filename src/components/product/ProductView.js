import { useState, useEffect } from "react";
import commerce from "../../lib/commerce";
import Loader from "../loader/Loader";
import { Grid, Container, Typography, Button } from '@mui/material';
import "./style.css";

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
// import ShoppingBagSharpIcon from '@mui/icons-material/ShoppingBagSharp';

const createMarkup = (text) => {
    return { __html: text };
  };

const ProductView = ({ addToCart }) => {

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
  
    const fetchProduct = async (id) => {
      const response = await commerce.products.retrieve(id);
      console.log(response.image.url);
      const { name, price, image, quantity, description } = response;
   
      setProduct({
        id,
        name,
        quantity,
        description,
        src: image.url,
        price: price.formatted_with_symbol,
      });
    };
  
    useEffect(() => {
      const id = window.location.pathname.split("/");
      fetchProduct(id[2]);
    }, []);
  
    const handleQuantity = (param) => {
      if (param === "decrease" && quantity > 1) {
        setQuantity(quantity - 1);
      }
      if (param === "increase" && quantity < 10) {
        setQuantity(quantity + 1);
      }
    };
  

    return (
        <Container className='product-view'>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8} className="image-wrapper">
                <img
                    onLoad={() => {
                    setLoading(false);
                    }}
                    src={product.src}
                    alt={product.name}
                />
                </Grid>
                <Grid item xs={12} md={4} className="text">
                <Typography variant="h2">{product.name}</Typography>
                <Typography
                    variant="p"
                    dangerouslySetInnerHTML={createMarkup(product.description)}
                />
                <Typography variant="h3">Price: {product.price}</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                    <Button
                        size="small"
                        variant="contained"
                        className="increase-product-quantity"
                        onClick={() => {
                        handleQuantity("increase");
                        }}
                    >
                        +
                    </Button>
                    </Grid>
                    <Grid item xs={12}>
                    <Typography className="quantity" variant="h3">
                        Quantity: {quantity}
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <Button
                        size="small"
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                        handleQuantity("decrease");
                        }}
                    >
                        -
                    </Button>
                    </Grid>
                    <Grid item xs={12}>
                    <Button
                        size="large"
                        className="custom-button"
                        onClick={() => {
                        addToCart(product.id, quantity);
                        }}
                    >
                        <ShoppingBagOutlinedIcon />
                    </Button>
                    </Grid>
                </Grid>
                </Grid>
            </Grid>
            {loading && <Loader />}
        </Container>
    );
};


export default ProductView;