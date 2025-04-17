const Food = require('../models/Food');

// @desc    Get all food items
// @route   GET /api/foods
const getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new food item
// @route   POST /api/foods
const addFood = async (req, res) => {
  try {
    const { name, costForTwo, imageUrl, description, category } = req.body;

    const newFood = new Food({
      name,
      costForTwo,
      imageUrl,
      description,
      category
    });

    await newFood.save();
    res.status(201).json({ message: 'Food item added successfully', food: newFood });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFoods,
  addFood
};
