// Component to display items currently in Cart. Pull this into Cart.jsx and Checkout.jsx.
import { useState, useEffect } from "react";
import AddToCart from "./AddToCart";
import RemoveFromCart from "./RemoveFromCart";

const CartItems = ({product_id, quantity}) => {
    const [product, setProduct] = useState();

    useEffect(() => {
      async function getCartItem() {
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
        }
      getCartItem();
    }, []);
    // console.log(product)
    
    return (
      <>
        {product?
        <div className="cart">
          <div className="cartListContainer">
            <div className="cartDetailContainer">
              <img src={product.image_url} alt={product.product_name} /> 
              <div className="cartDetailText">
                <h2>{product.product_name}</h2>
                <h1>${product.price}</h1>
              </div>
              <div className="cartButtons">
                <RemoveFromCart product={product_id}/>
                <h1>{quantity}</h1>
                <AddToCart product={product_id}/>
              </div>

            </div>
          </div>
        </div>
        :<h1>Loading</h1>}
      </>
    );
  }


export default CartItems;
