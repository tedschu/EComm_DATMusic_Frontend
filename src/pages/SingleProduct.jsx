// Single product detail page.

import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AddToCart from "../components/AddToCart";

// import any other dependent files here (ex. checkout)

function SingleProduct() {
  const [product, setProduct] = useState([]);
  const [price, setPrice] = useState("");

  const data = useParams();
  const product_id = data.product_id;

  useEffect(() => {
    async function getSingleProduct() {
      const response = await fetch(
        "http://localhost:8080/api/products/" + product_id,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setProduct(data);
      setPrice(
        data.price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      );
    }
    getSingleProduct();
  }, []);

  //console.log("data is: ", data);

  return (
    <>
      <div className="singleProductPageContainer">
        <div className="productListContainer">
          <div className="productDetailContainer">
            <h2>{product.product_name}</h2>
            <p>{product.product_description}</p>
            <h2 className="price">{price}</h2>
            <img src={product.image_url} alt={product.product_name} />
            <div className="buttonDiv">
              <Link to={"/"}>
                <button>Back to products</button>
              </Link>
              <AddToCart product={product.product_id}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
