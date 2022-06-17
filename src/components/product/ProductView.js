import { useState, useEffect } from "react";
import commerce from "../../lib/commerce";
import Loader from "../loader/Loader";
import { Grid, Container, Alert } from '@mui/material';
import "./style.css";


const createMarkup = (text) => {
    return { __html: text };
  };

const ProductView = ({ addToCart }) => {

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    // const [originalPrice, setOriginalPrice] = useState(0);
  
    const fetchProduct = async (id) => {

      const response = await commerce.products.retrieve(id);
      const { name, price, assets, image, variant_groups, quantity, description } = response;

      // setOriginalPrice(price.raw);
      setProduct({
        id,
        name,
        quantity,
        option:{},
        variant_groups,
        description,
        assets,
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
  
    // const priceCalculator = (optionPrice) => {
    //     if (optionPrice === originalPrice) {
    //       return product.price;
    //     }
    
    //     const priceArray = product.price.split(" ");
    //     const total = originalPrice + optionPrice;
    //     return `${total} ${priceArray[1]}`;
    //   };
    
    //   const updateProductImage = (src) => {
    //     setProduct({
    //       ...product,
    //       src
    //     });
    //   };

    //   const getImageUrl = (assetId) => {
    //     const relatedAsset = product.assets.find((color) => color.id === assetId);
    //     return relatedAsset?.url || "";
    //   };


      const handleSelectChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target; 
        setProduct({
          ...product,
          option: {
            [name]: value,
            ...product.option,
            [name]: value
          }
      })  
      }


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

                  <div className="variants" key={product.variant_groups.id}>
                  <h4>
                  Select variants
                  </h4>
                { 
                  <select 
                    onChange={handleSelectChange}  
                    name={product.variant_groups[0].id}
                    id="colors">
                      <option value="none">Select {product.variant_groups[0].name}</option>
                        {product.variant_groups[0].options?.map((color) => (
                          <option key={color.id}
                          value={color.id}
                          >{color.name}</option>
                        ))
                        }
                  </select>
                }{ 
                  <select 
                  onChange={handleSelectChange} 
                  name={product.variant_groups[1].id} 
                  id="sizes">
                    <option value="none">Select {product.variant_groups[1].name}</option>
                        {product.variant_groups[1].options?.map((size) => (
                          <option key={size.id}
                          value={size.id}
                          >{size.name}</option>
                        ))
                        }
                  </select>
                }
                </div>
                ) : null
                }

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
                      {product.option ?
                        <div className="add-to-cart-section">
                          {Object.keys(product.option).length !== 2 ?
                            <div className="disabled-btn">
                              <Alert style={{marginBottom:20,width:300}} 
                                severity="info">
                                Please select color and size.
                              </Alert>
                              <button
                                  className="product-view-cart-btn"
                                  onClick={() => {
                                  alert("Please select all variants.");
                                  }}
                              >
                                  <span>Add to bag</span>
                              </button>
                            </div>
                          : 
                            <button
                                className="product-view-cart-btn"
                                onClick={() => {
                                addToCart(product.id, quantity, product.option);
                                }}
                            >
                                <span>Add to bag</span>
                            </button>
                          }
                        </div>
                      :
                        null
                      }
                    </Grid>
                </Grid>
                </Grid>
            </Grid>
        </Container>
    );
    
};



export default ProductView;