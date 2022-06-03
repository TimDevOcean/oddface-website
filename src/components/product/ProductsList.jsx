import React from 'react';
import PropTypes from 'prop-types';
import ProductItem from './ProductItem';

import { Grid, Container } from "@mui/material";

const ProductsList = ({ products, onAddToCart }) => {

    return (
        <Container className="products" id="products">
            <Grid container rowSpacing={2} columnSpacing={2}>
            { products.map((product) => (
                <Grid key={product.id} item xs={6} sm={6} md={6}>
                    <ProductItem
                        product={product}
                        onAddToCart={onAddToCart}
                    />
                </Grid>
            ))}
            </Grid>
        </Container>
    );
};

ProductsList.propTypes = {
    products: PropTypes.array,
};

export default ProductsList;
