// Home page. Lists all products on web site.

import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductFilter from "../components/ProductFilter";

// PRODUCTS COMPONENT NOW TAKES IN "ISLOGGEDIN" PROPS TO USE (EX. FOR "LOGIN" TEXT, OR IN OTHER USES, FOR CART)
function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [noSearchResults, setNoSearchResults] = useState(false);
  const [value, setValue] = useState("");

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

  // Updates filteredProducts when there are search results
  useEffect(() => {
    const searchResultArray = products.filter((product) =>
      product.product_name.toLowerCase().includes(value.toLowerCase())
    );
    //console.log(searchResultArray);

    setFilteredProducts(searchResultArray);
    searchResultArray.length === 0 && setNoSearchResults(true); // TRIGGERS "NO RESULTS" TEXT BASED ON WHETHER RESULT ARRAY IS EMPTY OR NOT
    searchResultArray.length > 0 && setNoSearchResults(false);
  }, [value, products]);

  // Search bar results
  const setResults = (e) => {
    setValue(e.target.value);
    //console.log(value);
  };

  // Can be the basis for a filter menu that allows the user to filter items by category (or brand)
  // Needs to update setFilteredProducts state
  // Need to figure out the HTML / menu interaction point
  const showGuitarsArray = products.filter((product) => {
    return product.product_category === "drums";
  });

  return (
    <>
      <div className="searchContainer">
        <div className="searchBar">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size={"1x"}
            className="searchIcon"
          />
          <input
            type="text"
            placeholder="Search for your gear..."
            onChange={setResults}
          />
        </div>
      </div>
      <div className="productPageContainer">
        {/* <ProductFilter /> */}
        <div className="productListContainer">
          {noSearchResults && (
            <h2>There are no products that match your search</h2>
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
