import React, { useContext } from "react";
import { productContext } from "../context/shopContext.jsx";

export default function CartPage() {
  const { cart, totalAmount, setCart,navigate } = useContext(productContext);
  const removeItem = async (id) => {
    const updateCart = cart.filter((item) => item._id !== id);
    setCart(updateCart);
  };
  return (
    <>
      <h1 onClick={()=>navigate('/home')} className="text-green-900 text-2xl font-bold p-4 cursor-pointer"> Back </h1>
      <h1 className="text-green-900 text-2xl font-bold p-4">Carts</h1>
      <div className=" grid grid-cols-2 gap-3 px-4">
        {cart.length === 0 ? (
          <p>Cart is Empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition border grid grid-cols-1"
              >
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <h3 className="text-lg font-semibold">Qty : {item.qty}</h3>
                <p className="text-green-600 font-bold mt-2">₹{item.price}</p>
                <p
                  onClick={() => removeItem(item._id)}
                  className="text-red-600 font-bold mt-2 cursor-pointer"
                >
                  remove
                </p>
              </div>
            ))}
          </>
        )}

        <h4 className="text-xl font-bold text-left">Total: ₹{totalAmount}</h4>
      </div>
    </>
  );
}
