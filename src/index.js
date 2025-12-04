import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./style.css";
import reportWebVitals from "./reportWebVitals";
import { CartProvider } from "./context/cart-context";
import { LoginProvider } from "./context/login-context";
import { WishlistProvider } from "./context/wishlist-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <LoginProvider>
          <WishlistProvider>
            <App/>
          </WishlistProvider>
        </LoginProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
