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
  // Will use eventually to handle logged-in state, which we will pass down to individual pages / components (ex. account)
  //const [count, setCount] = useState(0);

  return (
    <>
      <Nav />

      <Routes>
        <Route index element={<Products />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orderconfirmation" element={<OrderConfirmation />} />
        <Route path="/register" element={<Register />} />
        <Route path="products/:product_id" element={<SingleProduct />} />
      </Routes>
    </>
  );
}

export default App;
