import { React, useState } from "react";
import {
  Grid,
  Paper,
  Container,
  InputBase,
  IconButton,
  Alert,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import SelectCategory from "./SelectCategory";
import commerce from "../../lib/commerce";
import ProductItem from "../product/ProductItem";
import "./style.css";
import Loader from "../loader/Loader";

const FilterProduct = ({
  categories,
  addProduct,
  searchResult,
  setSearchResult,
}) => {
  const [loading, setLoading] = useState(false);
  const defaultCategory = { id: 0, name: "All" };
  const [keyword, setKeyword] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
    
  const showAlert = () => {
    var element = document.getElementById("filter-alert");
    element.classList.remove("hide");
  }

  const hideAlert = () => {
    var element = document.getElementById("filter-alert");
    element.classList.add("hide");
  }


  const handleInputChange = (event) => {
    if (!keyword || !event.target.value) {
      setResultMessage("");
      setSearchResult([]);
      setSelectedCategory(defaultCategory);
    }
    setKeyword(event.target.value);
  };

  const handleSelectChange = (event) => {
    const { value } = event.target;
    const category = categories.find((cat) => cat.id === value);
    if (value === 0) {
      setSelectedCategory(defaultCategory);
    } else {
      setSelectedCategory(category);
    }
    showAlert();
    setTimeout(hideAlert, 6000);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!keyword) {
    //   setSelectedCategory(defaultCategory);
    //   setResultMessage("You have to enter a product name");

    try {
        const categoryId = selectedCategory.id
          ? { category_id: selectedCategory.id }
          : {};
        const { data } = await commerce.products.list({
          ...categoryId,
        });
        if (!data) {
            setResultMessage("Nothing found.");
            setLoading(false);
            setSearchResult([]);
          return;
        }
        setResultMessage("");
        setSearchResult(data);
      } catch (error) {
        setSearchResult([]);
      }

    }
    if (keyword) {
      try {
        const categoryId = selectedCategory.id
          ? { category_id: selectedCategory.id }
          : {};
        const { data } = await commerce.products.list({
          query: keyword,
          ...categoryId,
        });
        if (!data) {
          setResultMessage("Nothing found.");
          setLoading(false);
          setSearchResult([]);
          return;
        }
        setResultMessage("");
        setSearchResult(data);
      } catch (error) {
        setSearchResult([]);
      }
    }
    setLoading(false);
  };

  return (
    <div className="filter-bar">
      <Container className="filter-container">
        <Paper component="form" className="root" onSubmit={onSubmit}>
          <SelectCategory 
            categories={[defaultCategory, ...categories]}
            selectedCategory={selectedCategory}
            onChange={handleSelectChange}
          />
          <InputBase
            className="input"
            onChange={handleInputChange}
            placeholder="Search product"
            inputProps={{ "aria-label": "Search product" }}
          />
          <IconButton type="submit" aria-label="search">
            <Search />
          </IconButton>
        </Paper>
        <div style={{padding: 10}}>
            {loading && <Loader />}
            <Alert id="filter-alert" className="hide" style={{width:425, margin:"auto"}} 
              severity="info" onClose={() => hideAlert()}>
              Click on the search icon to filter categories.
            </Alert>
        </div>
        {resultMessage && <p className="result-message">{resultMessage}</p>}
        {searchResult.length && (
          <div className="search-results">
            <Grid container spacing={4}>
              {searchResult.map((product) => (
                <Grid key={product.id} item xs={12} sm={6} md={6}>
                  <ProductItem product={product} addProduct={addProduct} />
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </Container>
    </div>
  );
};

export default FilterProduct;