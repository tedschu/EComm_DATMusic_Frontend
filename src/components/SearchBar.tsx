import React from "react";
import { useState, useEffect } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SearchBarProps = {
  products: any[]; // For now, we'll use 'any[]' for products
  setFilteredProducts: (products: any[]) => void;
  setSearchArray: (products: any[]) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  setNoSearchResults: (value: boolean) => void;
};

function SearchBar({
  products,
  setFilteredProducts,
  setSearchArray,
  searchValue,
  setSearchValue,
  setNoSearchResults,
}) {
  // Updates filteredProducts when there are search results
  useEffect(() => {
    const searchResultArray = products.filter((product) =>
      product.product_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    //console.log(searchResultArray);

    setFilteredProducts(searchResultArray);
    setSearchArray(searchResultArray);
    setNoSearchResults(searchResultArray.length === 0);
    searchResultArray.length === 0 && setNoSearchResults(true); // TRIGGERS "NO RESULTS" TEXT BASED ON WHETHER RESULT ARRAY IS EMPTY OR NOT
    searchResultArray.length > 0 && setNoSearchResults(false);
  }, [searchValue, products]);

  // Search bar results
  const setResults = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

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
    </>
  );
}

export default SearchBar;
