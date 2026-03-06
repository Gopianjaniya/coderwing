const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart, updateQuantity } = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', getCart);
router.post('/add', addToCart);
router.delete('/remove/:productId', removeFromCart);
router.put('/update/:productId', updateQuantity);

module.exports = router;
