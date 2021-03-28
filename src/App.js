import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { commerce } from "./lib/commerce";

import { ShoppingProvider } from "./context/ShoppingContext";

import { Navbar, Products, Cart } from "./components";

const App = () => {
  const [productIsLodded, setProductIsLodded] = useState(false);
  const [cartIsLodded, setCartIsLodded] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

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
          </Switch>
        </div>
      </Router>
    </ShoppingProvider>
  ) : (
    <h1>Loading...</h1>
  );
};

export default App;
