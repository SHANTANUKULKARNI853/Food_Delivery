const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.placeOrder = async (req, res) => {
  const userId = req.user._id;
  const { deliveryAddress } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.productId', 'costForTwo');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalAmount = cart.items.reduce((acc, item) => {
      return acc + (item.quantity * (item.productId.costForTwo || 0));
    }, 0);

    const order = new Order({
      user: userId,
      items: cart.items,
      totalAmount,
      deliveryAddress,
    });

    await order.save();

    // Optionally, clear cart after order placed
    await Cart.findOneAndDelete({ user: userId });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to place order' });
  }
};
