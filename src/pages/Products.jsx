// Home page. Lists all products on web site.

import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ProductFilter from "../components/ProductFilter";
import SearchBar from "../components/SearchBar";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    guitars: false,
    drums: false,
    pianos: false,
    less1000: false,
    between10002000: false,
    above2000: false,
  });
  const [noSearchResults, setNoSearchResults] = useState(false);
  const [searchArray, setSearchArray] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // Grabs products from the database, updates products and filteredProducts states
  useEffect(() => {
    async function getAllProducts() {
      const response = await fetch("http://localhost:8080/api/products/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    }
    getAllProducts();
  }, []);

  //console.log(filteredProducts[0].product_name);

  return (
    <>
      <SearchBar
        products={products}
        setFilteredProducts={setFilteredProducts}
        setSearchArray={setSearchArray}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setNoSearchResults={setNoSearchResults}
      />

      <div className="productPageContainer">
        <ProductFilter
          searchArray={searchArray}
          setFilteredProducts={setFilteredProducts}
          filters={filters}
          products={products}
          setFilters={setFilters}
          searchValue={searchValue}
        />
        <div className="productListContainer">
          {filteredProducts.length === 0 && (
            <h2>There are no products based on these criteria</h2>
          )}
          {filteredProducts.map((product) => (
            <Link
              className="link"
              to={"products/" + product.product_id}
              key={product.product_id}
            >
              <div className="productContainer">
                <h2>{product.product_name}</h2>
                {/* <h3>{product.product_description}</h3> */}
                <h2 className="price">
                  {product.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </h2>
                <img src={product.image_url} alt={product.product_name} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;
