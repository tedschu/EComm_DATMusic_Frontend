import React from "react";
import { useState, useEffect } from "react";

function ProductFilter({
  searchArray,
  setFilteredProducts,
  filters,
  products,
  setFilters,
  searchValue,
}) {
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

  return (
    <>
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
    </>
  );
}

export default ProductFilter;
