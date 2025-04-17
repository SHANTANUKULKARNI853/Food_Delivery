const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const User = require('../models/User'); // Import User model to fetch data
const router = express.Router();

// POST /api/users/register
router.post('/register', registerUser);

// POST /api/users/login
router.post('/login', loginUser);

// GET /api/users/:email - Fetch user details by email
router.get('/:email', async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.params.email });

    // If no user is found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user data back in the response
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
