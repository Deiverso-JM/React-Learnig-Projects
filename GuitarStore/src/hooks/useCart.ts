import { useState, useEffect } from "react";
import { db } from "../data/db";
import { useMemo } from "react";
import type { CartGuitar, Guitar } from "../types";

export const useCart = () => {
  const initialCart = (): CartGuitar[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  // eslint-disable-next-line no-unused-vars
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(data: CartGuitar) {
    const dataExist = cart.findIndex((item) => item.id === data.id);
    if (dataExist >= 0) {
      const updateCard = [...cart];
      updateCard[dataExist].quantity++;
      setCart(updateCard);
    } else {
      data.quantity = 1;
      setCart((prevCart) => [...prevCart, data]);
    }
  }

  function removeFromCart(id: Guitar["id"]) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function incrementarCart(id: Guitar["id"]) {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity < 5) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    setCart(updateCart);
  }

  function decrementarCart(id: Guitar["id"]) {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity > 0) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }

      return item;
    });

    setCart(updateCart);
  }

  function cleanCart() {
    setCart([]);
  }

  //State derivado
  const isEmpity = useMemo(() => cart.length === 0, [cart]);
  const calcularTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return {
    addToCart,
    incrementarCart,
    decrementarCart,
    removeFromCart,
    cart,
    data,
    cleanCart,
    isEmpity,
    calcularTotal,
  };
};
