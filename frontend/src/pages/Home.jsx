import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import API from '../api/axios';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [addingId, setAddingId] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/api/products');
        setProducts(data);
      } catch {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId, productName) => {
    setAddingId(productId);
    try {
      await addToCart(productId);
      toast.success(`${productName} added to cart! 🛒`);
    } catch {
      toast.error('Failed to add to cart. Please login first.');
    } finally {
      setAddingId(null);
    }
  };

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || p.category === category;
    return matchSearch && matchCat;
  });

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover <span className="gradient-text">Amazing</span> Products
          </h1>
          <p className="hero-subtitle">Shop the latest trends with the best prices</p>
        </div>
        <div className="hero-decoration">🛍️</div>
      </section>

      {/* Filters */}
      <section className="filters-section">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`pill ${category === cat ? 'pill-active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <p className="products-count">{filtered.length} products found</p>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No products found</h3>
            <p>Try a different search or category</p>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image-wrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Product';
                    }}
                  />
                  <div className="product-category-tag">{product.category}</div>
                  <div className="product-rating">
                    ⭐ {product.rating?.toFixed(1)}
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-desc">{product.description}</p>
                  <div className="product-footer">
                    <span className="product-price">${product.price}</span>
                    <button
                      className={`btn-add-cart ${addingId === product._id ? 'btn-loading' : ''}`}
                      onClick={() => handleAddToCart(product._id, product.name)}
                      disabled={addingId === product._id}
                    >
                      {addingId === product._id ? (
                        <><span className="btn-spinner"></span>Adding...</>
                      ) : (
                        '🛒 Add to Cart'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
