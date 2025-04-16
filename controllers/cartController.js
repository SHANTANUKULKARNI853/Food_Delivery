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
  console.log("Fetching cart for userId:", userId);

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch the cart and log the items before populate
    let cart = await Cart.findOne({ user: userId });
    console.log("Cart before populating:", cart);

    // Populate the productId field
    cart = await Cart.findOne({ user: userId }).populate('items.productId');
    console.log("Cart after populating:", cart);  // Log populated cart

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    res.status(200).json({ items: cart.items });
  } catch (error) {
    console.error("Get Cart Error:", error);
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