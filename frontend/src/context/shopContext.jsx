import { createContext, useState } from "react";
import { products } from "../assets/assest.js";
import { useNavigate } from "react-router-dom";

export const productContext = createContext();

export default function productContextProvider(props) {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate()

  // =========== addToCart -----------
  const addToCart = (product) => {
    const exist = cart.find((item) => item._id === product._id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );
  const value = {
    cart,
    setCart,
    products,
    addToCart,
    totalAmount,
    navigate,
  };
  return (
    <>
      <productContext.Provider value={value}>
        {props.children}
      </productContext.Provider>
    </>
  );
}
