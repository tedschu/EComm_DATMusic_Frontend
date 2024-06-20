import { useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import React from "react";
import Nav from "./components/Nav";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import OrderConfirmation from "./pages/OrderConfirmation";
import Products from "./pages/Products";
import Register from "./pages/Register";
import SingleProduct from "./pages/SingleProduct";
import ProductFilter from "./components/ProductFilter";

function App() {
  // PARENT STATE TO MANAGE LOGGED-IN STATUS.
  // Passes "setisLoggedIn" as props to Login , which accepts it as props and can update in onClick or onSubmit event
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ALSO NEEDS A STATE VALUE FOR CART
  // If a user adds something to their cart, this can update a value next to the cart to show the items in their cart (ex. "1")
  //const [numCartItems, setNumCartItems] = useState(0)

  return (
    <>
      <Nav />

      <Routes>
        {/* OTHER COMPONENTS LIKE PRODUCTS CAN THEN USE THE "ISLOGGEDIN" STATE VALUE */}
        {/* <Route index element={<Products isLoggedIn={isLoggedIn} />} /> */}

        <Route index element={<Products />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* PASSING SETISLOGGEDIN TO THE LOGIN COMPONENT - DELETE OR UPDATE EXISTING LOGIN PATH */}
        {/* <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        /> */}

        <Route path="/login" element={<Login />} />
        <Route path="/orderconfirmation" element={<OrderConfirmation />} />
        <Route path="/register" element={<Register />} />
        <Route path="products/:product_id" element={<SingleProduct />} />
      </Routes>
    </>
  );
}

export default App;
