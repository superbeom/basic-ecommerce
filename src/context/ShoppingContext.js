import React, { useState, createContext, useContext } from "react";
import { commerce } from "../lib/commerce";

export const ShoppingContext = createContext([{}, () => {}]);

export const ShoppingProvider = ({
  products: productsProp,
  cart: cartProp,
  children,
}) => {
  const [products, setProducts] = useState(productsProp);
  const [cart, setCart] = useState(cartProp);

  const addToCart = async (productId, quantity) => {
    try {
      const { success, cart } = await commerce.cart.add(productId, quantity);

      if (success) {
        setCart(cart);
      } else {
        console.warn("You can't add this item to shopping cart.");
      }
    } catch (error) {
      console.log("Error @addToCart_ShoppingContext: ", error.message);
    }
  };

  const updateCartQty = async (productId, quantity) => {
    try {
      const { success, cart } = await commerce.cart.update(productId, {
        quantity,
      });

      if (success) {
        setCart(cart);
      } else {
        console.warn("You can't update this item.");
      }
    } catch (error) {
      console.log("Error @updateCartQty_ShoppingContext: ", error.message);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { success, cart } = await commerce.cart.remove(productId);

      if (success) {
        setCart(cart);
      } else {
        console.warn("You can't remove this item.");
      }
    } catch (error) {
      console.log("Error @removeFromCart_ShoppingContext: ", error.message);
    }
  };

  return (
    <ShoppingContext.Provider
      value={{
        products,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export const useProducts = () => {
  const { products } = useContext(ShoppingContext);
  return products;
};

export const useCart = () => {
  const { cart } = useContext(ShoppingContext);
  return cart;
};

export const useAddToCart = () => {
  const { addToCart } = useContext(ShoppingContext);
  return addToCart;
};

export const useUpdateCartQty = () => {
  const { updateCartQty } = useContext(ShoppingContext);
  return updateCartQty;
};

export const useRemoveFromCart = () => {
  const { removeFromCart } = useContext(ShoppingContext);
  return removeFromCart;
};
