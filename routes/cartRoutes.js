const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');

const router = express.Router();

router.post('/add', addToCart);
router.get('/', getCart);  // Bypassing userId for now
router.get('/:userId', getCart); // Keep this for future use when authentication is added
router.post('/remove', removeFromCart);

module.exports = router;
