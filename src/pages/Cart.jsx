// Cart detail page to edit products or go to "checkout" button (goes to Checkout page)

import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartItems from "../components/CartItems";

// import any other dependent files here (ex. checkout)

function Cart({isLoggedIn}) {
  const [cart, setCart] = useState([]);
  // make total state
  // const [cartTotal, setCartTotal] = useState(0);


  //fetch current cart from the api
  useEffect(() => {
    async function getCart() {
      const response = await fetch("http://localhost:8080/api/order_items/1", {
        headers: {
          "Content-Type": "application/json",
        },
      });
        const data = await response.json();
        console.log(data);
        //store cart in state
        setCart(data.cart);
    };
    getCart(); 
  }, []);
  // console.log(cart)
  
  let total = 0;
  // total+=cartTotal;






  return (
    <>
    <div id="cart">
      <div id="currentOrder">   
          {
            
            cart.length?cart.map((i)=> (
              <div className="cartItemCard" key={i.order_items_id}>
                {
                  <div>
                  <CartItems product_id={i.product_id}  total={total} quantity={i.order_items_quantity}/>
                  {/* {i.order_items_quantity} */}
                  </div>
                }
              </div>
            )):<h1>Items you have added to your cart will appear here.</h1>
          }
      </div>

      <div id="cartSidebar">
        <h1>Total:</h1>

        {isLoggedIn?<Link to={"/checkout"}><button>Checkout</button></Link>:<Link to={"/register"}><button>Register to Checkout</button></Link>}
        
      </div>

    </div>
    </>
  );
}

export default Cart;
