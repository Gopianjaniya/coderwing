 

export default function Cart({id,name,price,item,addToCart}) {
  return (
    <>
      {" "}
      <div
        key={id}
        className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition"
      >
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-green-600 font-bold mt-2">₹{price}</p>
        <button
          onClick={() => addToCart(item)}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </>
  );
}
