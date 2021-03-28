import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { commerce } from "./lib/commerce";

import { ShoppingProvider, useRefreshCart } from "./context/ShoppingContext";

import { Navbar, Products, Cart, Checkout } from "./components";

const App = () => {
  const [productIsLodded, setProductIsLodded] = useState(false);
  const [cartIsLodded, setCartIsLodded] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const refreshCart = useRefreshCart();

  const fetchProducts = async () => {
    try {
      const { data } = await commerce.products.list();

      if (data) {
        setProducts(data);
        setProductIsLodded(true);
      }
    } catch (error) {
      console.log("Error @fetchProducts_App: ", error.message);
    }
  };

  const fetchCart = async () => {
    try {
      const data = await commerce.cart.retrieve();

      if (data) {
        setCart(data);
        setCartIsLodded(true);
      }
    } catch (error) {
      console.log("Error @fetchCart_App: ", error.message);
    }
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      console.log("Error @handleCaptureCheckout_App: ", error.message);

      setErrorMessage(error?.data?.error?.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return productIsLodded && cartIsLodded ? (
    <ShoppingProvider products={products} cart={cart}>
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Products />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/checkout">
              <Checkout
                onCaptureCheckout={handleCaptureCheckout}
                order={order}
                error={errorMessage}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </ShoppingProvider>
  ) : (
    <h1>Loading...</h1>
  );
};

export default App;
