import ProductsList from "../product/ProductsList";
import "./style.css";

const Shop = ({ categories, onAddToCart }) => {

  return (
    <div className="shop">
        <ProductsList 
            categories={categories}
            onAddToCart={onAddToCart}
        />
    </div>
  );
}

export default Shop;