const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get current user's cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
      'name price image category'
    );
    res.json(cart || { items: [] });
  } catch (error) {
    console.error('Get cart error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find((item) => item.product.toString() === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
    }

    const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
      'name price image category'
    );
    res.json(updatedCart);
  } catch (error) {
    console.error('Add to cart error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:productId
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = cart.items.filter((item) => item.product.toString() !== req.params.productId);
      await cart.save();
    }
    const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
      'name price image category'
    );
    res.json(updatedCart || { items: [] });
  } catch (error) {
    console.error('Remove from cart error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update quantity of item in cart
// @route   PUT /api/cart/update/:productId
// @access  Private
const updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find((item) => item.product.toString() === req.params.productId);
    if (item) {
      if (quantity <= 0) {
        cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
      } else {
        item.quantity = quantity;
      }
      await cart.save();
    }

    const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
      'name price image category'
    );
    res.json(updatedCart);
  } catch (error) {
    console.error('Update cart error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getCart, addToCart, removeFromCart, updateQuantity };
