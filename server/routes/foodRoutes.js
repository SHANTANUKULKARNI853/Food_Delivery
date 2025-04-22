const express = require('express');
const router = express.Router();
const { getFoods, addFood } = require('../controllers/foodController');

// GET all food items
router.get('/', getFoods);

// POST a new food item
router.post('/', addFood);

module.exports = router;
