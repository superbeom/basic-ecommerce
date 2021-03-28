import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";

import { Navbar, Products } from "./components";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const { success, cart } = await commerce.cart.add(productId, quantity);

    if (success) {
      setCart(cart);
    } else {
      console.warn("You can't add this item to shopping cart.");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      <Products products={products} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default App;
