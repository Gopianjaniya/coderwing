import { useContext } from "react";
import Cart from "../components/Cart";
import { productContext } from "../context/shopContext.jsx";

function Home() {
  const { cart, products, addToCart, navigate } =
    useContext(productContext);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Products</h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <Cart
            key={p._id}
            id={p._id}
            name={p.name}
            price={p.price}
            item={p.item}
            addToCart={() => addToCart(p)}
          />
        ))}
      </div>

      {/* Cart Section */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow">
        <h3
          onClick={() => navigate("/cartpage")}
          className="text-2xl font-bold mb-4"
        >
          Cart ({cart.length})
        </h3>
      </div>
    </div>
  );
}

export default Home;
