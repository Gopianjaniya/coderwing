import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, cartTotal, removeFromCart, updateQuantity, cartLoading } = useCart();
  const items = cart?.items || [];

  const handleRemove = async (productId, name) => {
    try {
      await removeFromCart(productId);
      toast.success(`${name} removed from cart`);
    } catch {
      toast.error('Failed to remove item');
    }
  };

  const handleQuantity = async (productId, newQty) => {
    if (newQty < 1) return;
    try {
      await updateQuantity(productId, newQty);
    } catch {
      toast.error('Failed to update quantity');
    }
  };

  if (cartLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading cart...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet</p>
          <Link to="/" className="btn-continue-shopping">
            Browse Products →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1 className="cart-title">🛒 Your Cart</h1>
        <p className="cart-count">{items.length} item{items.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.product?._id} className="cart-item">
              <div className="cart-item-image-wrap">
                <img
                  src={item.product?.image}
                  alt={item.product?.name}
                  className="cart-item-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100x100?text=Product';
                  }}
                />
              </div>
              <div className="cart-item-info">
                <h3 className="cart-item-name">{item.product?.name}</h3>
                <p className="cart-item-category">{item.product?.category}</p>
                <p className="cart-item-price">${item.product?.price}</p>
              </div>
              <div className="cart-item-controls">
                <div className="qty-control">
                  <button
                    className="qty-btn"
                    onClick={() => handleQuantity(item.product?._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => handleQuantity(item.product?._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <p className="cart-item-subtotal">
                  ${(item.product?.price * item.quantity).toFixed(2)}
                </p>
                <button
                  className="btn-remove"
                  onClick={() => handleRemove(item.product?._id, item.product?.name)}
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2 className="summary-title">Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal ({items.length} items)</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-shipping">FREE</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <button className="btn-checkout">
            Proceed to Checkout →
          </button>
          <Link to="/" className="btn-continue-link">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
