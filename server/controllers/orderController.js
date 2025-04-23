const Order = require('../models/Order');
const Cart = require('../models/Cart');
const mongoose = require('mongoose');

const createOrder = async (req, res) => {
  try {
    const { userId, userInfo, totalAmount } = req.body;
    const cart = await Cart.findOne({ user: userId }).populate('items.productId', 'name costForTwo imageUrl description category');

    if (!cart) {
      return res.status(400).json({ message: 'No cart found for the user' });
    }

    const items = cart.items.map(item => ({
      foodItem: item.productId.name,
      quantity: item.quantity,
      price: item.productId.costForTwo
    }));

    const newOrder = new Order({
      user: userId,
      items,
      totalAmount,
      userInfo, // Add user information from the frontend
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getUserOrders, getAllOrders };
