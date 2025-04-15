const Cart = require('../models/Cart');
 
// Add item to cart
const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
 
  try {
    let cart = await Cart.findOne({ user: userId });
 
    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
 
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    } else {
      cart = new Cart({
        user: userId,
        items: [{ productId, quantity }],
      });
    }
 
    await cart.save();
    res.status(200).json({ message: 'Cart updated', cart });
 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// Get cart by user
const getCart = async (req, res) => {
  const { userId } = req.params;
 
  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.productId');
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// Remove item
const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;
 
  try {
    const cart = await Cart.findOne({ user: userId });
 
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
 
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
 
    res.status(200).json({ message: 'Item removed', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};