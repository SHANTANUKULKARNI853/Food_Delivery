const mongoose = require('mongoose');
const Cart = require('../models/Cart');

// Add item to cart
const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Ensure productId is a valid ObjectId before processing
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // Check if the item already exists in the cart
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        // Update the quantity if the item exists
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add the new item to the cart
        cart.items.push({ productId, quantity });
      }
    } else {
      // Create a new cart if none exists
      cart = new Cart({
        user: userId,
        items: [{ productId, quantity }],
      });
    }

    // Save the cart and respond
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
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch the cart without population first
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    // Populate the productId field of the cart items
    cart = await Cart.findOne({ user: userId }).populate('items.productId', 'name price image description category');

    // Check if the cart was populated correctly
    console.log("Populated Cart:", cart);

    res.status(200).json({ items: cart.items });

  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // Filter out the item to remove
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
