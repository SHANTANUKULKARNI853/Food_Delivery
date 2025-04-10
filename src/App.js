import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "10px", background: "#f8f8f8" }}>
        <Link to="/" style={{ marginRight: "20px" }}>Home</Link>
        <Link to="/cart">Cart</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h2 style={{ padding: "20px" }}>Welcome to Food Delivery App!</h2>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
