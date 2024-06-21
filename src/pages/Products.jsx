// Home page. Lists all products on web site.

import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductFilter from "../components/ProductFilter";

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

  // Updates filteredProducts when there are search results
  useEffect(() => {
    const searchResultArray = products.filter((product) =>
      product.product_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    //console.log(searchResultArray);

    setFilteredProducts(searchResultArray);
    setSearchArray(searchResultArray);
    searchResultArray.length === 0 && setNoSearchResults(true); // TRIGGERS "NO RESULTS" TEXT BASED ON WHETHER RESULT ARRAY IS EMPTY OR NOT
    searchResultArray.length > 0 && setNoSearchResults(false);
  }, [searchValue, products]);

  // Search bar results
  const setResults = (e) => {
    setSearchValue(e.target.value);
    //console.log(value);
  };

  // Filter menu on left side that updates filteredProducts based on criteria selected
  // Needs to update setFilteredProducts state
  // Need to figure out the HTML / menu interaction point
  const handleFilterChange = (event) => {
    const { name, checked } = event.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  useEffect(() => {
    const applyFilters = (productsToFilter) => {
      return productsToFilter.filter((product) => {
        const categoryMatch =
          (!filters.guitars && !filters.drums && !filters.pianos) ||
          (filters.guitars && product.product_category === "guitars") ||
          (filters.drums && product.product_category === "drums") ||
          (filters.pianos && product.product_category === "pianos");

        const priceMatch =
          (!filters.less1000 &&
            !filters.between10002000 &&
            !filters.above2000) ||
          (filters.less1000 && product.price < 1000) ||
          (filters.between10002000 &&
            product.price >= 1000 &&
            product.price < 2000) ||
          (filters.above2000 && product.price >= 2000);

        return categoryMatch && priceMatch;
      });
    };

    if (
      !filters.guitars &&
      !filters.drums &&
      !filters.pianos &&
      !filters.less1000 &&
      !filters.between10002000 &&
      !filters.above2000
    ) {
      setFilteredProducts(products);
    } else if (searchValue !== "") {
      const filteredProducts = applyFilters(searchArray);
      setFilteredProducts(filteredProducts);
    } else {
      const filteredProducts = applyFilters(products);
      setFilteredProducts(filteredProducts);
    }
  }, [filters, products]);

  console.log("This is the filtered products: ", filteredProducts);
  console.log("This is the products: ", products);

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
        <div className="leftMenu">
          <h3>Refine your search</h3>

          <div className="filterMenu Category">
            <h4>Categories</h4>
            {/* CHECKBOXES FOR PRODUCT CATEGORIES */}
            <input
              type="checkbox"
              id="guitars"
              name="guitars"
              value="guitars"
              checked={filters.guitars}
              onChange={handleFilterChange}
            />
            <label for="guitars">Guitars</label>
            <br></br>
            <input
              type="checkbox"
              id="drums"
              name="drums"
              value="drums"
              onChange={handleFilterChange}
              checked={filters.drums}
            />
            <label for="drums">Drums</label>
            <br></br>
            <input
              type="checkbox"
              id="pianos"
              name="pianos"
              value="pianos"
              onChange={handleFilterChange}
              checked={filters.pianos}
            />
            <label for="pianos">Pianos</label>
            <br></br>
          </div>

          {/* CHECKBOXES FOR PRICE FILTERS */}
          <div className="filterMenu Price">
            <h4>Price range</h4>
            <input
              type="checkbox"
              id="less1000"
              name="less1000"
              value="less1000"
              checked={filters.less1000}
              onChange={handleFilterChange}
            />
            <label for="less1000">$1,000 or less</label>
            <br></br>
            <input
              type="checkbox"
              id="between10002000"
              name="between10002000"
              value="between10002000"
              onChange={handleFilterChange}
              checked={filters.between10002000}
            />
            <label for="between10002000">$1,000-$2,000</label>
            <br></br>
            <input
              type="checkbox"
              id="above2000"
              name="above2000"
              value="above2000"
              onChange={handleFilterChange}
              checked={filters.above2000}
            />
            <label for="above2000">$2,000+</label>
          </div>
        </div>
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
