import { useState, useEffect } from "react";
import commerce from "../../lib/commerce";
import Loader from "../loader/Loader";
import { Grid, Container } from '@mui/material';
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
    const [originalPrice, setOriginalPrice] = useState(0);
  
    const fetchProduct = async (id) => {

      const response = await commerce.products.retrieve(id);
      const { name, price, assets, image, variant_groups, quantity, description } = response;
      console.log(response);

      setOriginalPrice(price.raw);
      setProduct({
        id,
        name,
        quantity,
        variant_groups,
        description,
        assets,
        src: image.url,
        price: price.formatted_with_code,
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
  
    const priceCalculator = (optionPrice) => {
        if (optionPrice === originalPrice) {
          return product.price;
        }
    
        const priceArray = product.price.split(" ");
        const total = originalPrice + optionPrice;
        return `${total} ${priceArray[1]}`;
      };
    
      const updateProduct = (optionPrice, src, { id, variantId }) => {
        setProduct({
          ...product,
          price: priceCalculator(optionPrice),
          src,
          option: { [variantId]: id },
        });
      };
    
      const getImageUrl = (assetId) => {
        const relatedAsset = product.assets.find((pro) => pro.id === assetId);
        return relatedAsset?.url || "";
      };

    return (
        <Container className='product-view'>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                <img className="product-view-img"
                    onLoad={() => {
                    setLoading(false);
                    }}
                    src={product.src}
                    alt={product.name}
                />
                {loading && <Loader />}

                </Grid>
                <Grid item xs={12} md={6}>
                <span className="product-view-title">{product.name}</span>
                <p className="product-description"
                    dangerouslySetInnerHTML={createMarkup(product.description)}
                />
                <p className="product-view-price">{product.price}</p>

                {product.variant_groups?.length ? (
                  <h4>
                  Select variants.
                  </h4>
                ) : null}
                <div className="variants colors">
                  {product.variant_groups?.length
                    ? product.variant_groups[0].options?.map((color) => (
                        <button
                          key={color.id}
                          src={getImageUrl(color.assets[0])}
                          alt={color.name}
                          onClick={() =>
                            updateProduct(color.price.raw, getImageUrl(color.assets[0]), {
                              id: color.id,
                              variantId: product.variant_groups[0].id,
                            })
                          }
                        >{color.name}</button>
                      ))
                    : null}
                </div>

                <Grid container className="product-view-actions" spacing={4}>
                    <Grid item xs={12} md={1.5}>
                    <button
                        className="product-view-qty-btn"
                        onClick={() => {
                        handleQuantity("decrease");
                        }}
                    >
                        -
                    </button>
                    </Grid>
                    <Grid item xs={12} md={1}>
                    <p className="product-view-qty">
                        {quantity}
                    </p>
                    </Grid>
                    <Grid item xs={12} md={1.5}>
                    <button
                        className="product-view-qty-btn"
                        onClick={() => {
                        handleQuantity("increase");
                        }}
                    >
                        +
                    </button>
                    </Grid>
                    <Grid item xs={12}>
                    <button
                        className="product-view-cart-btn"
                        onClick={() => {
                        addToCart(product.id, quantity, product.option);
                        }}
                    >
                        <span>Add to cart</span> <ShoppingBagOutlinedIcon className="bag-icon"/>
                    </button>
                    </Grid>
                </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};


export default ProductView;