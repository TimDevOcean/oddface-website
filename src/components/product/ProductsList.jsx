import React from 'react';
import PropTypes from 'prop-types';
import ProductItem from './ProductItem';
import FilterProduct from '../filter/FilterProduct';

import { Grid, Container } from "@mui/material";
import Loader from '../loader/Loader';

const ProductsList = ({ categories, onAddToCart }) => {
    const [searchResult, setSearchResult] = React.useState([]);
    if (!categories.length) return <Loader />

    return (
        <div>
        <FilterProduct
            addProduct={onAddToCart}
            categories={categories}
            searchResult={searchResult}
            setSearchResult={setSearchResult}
        />
        {!searchResult.length && (
        <>
          {categories.map((category) =>
            category.productsData.length ? (
              <div key={category.id} className="product-list">
              <div className='category-name'>{category.name}</div>
                <Container className="products" id="products">
                    <Grid container rowSpacing={2} columnSpacing={2}>
                    { category.productsData.map((product) => (
                        <Grid key={product.id} item xs={12} sm={6} md={6}>
                            <ProductItem
                                product={product}
                                onAddToCart={onAddToCart}
                                categoryName={category.name}
                            />
                        </Grid>
                    ))}
                    </Grid>
                </Container>
              </div>
            ) : null
    )}
    </>
    )}
</div>

);
};

ProductsList.propTypes = {
    products: PropTypes.array,
};

export default ProductsList;
