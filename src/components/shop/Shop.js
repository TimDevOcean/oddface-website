import ProductsList from "../product/ProductsList";
import "./style.css";

const Shop = ({ products, onAddToCart }) => {

  return (
    <div className="shop">
        <ProductsList 
            products={products}
            onAddToCart={onAddToCart}
        />
    </div>
  );
}

export default Shop;