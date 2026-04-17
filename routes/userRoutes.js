const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const data = req.body;

    const newUser = new User(data);
    const response = await newUser.save();

    const payload = {
      id: response.id,
      username: response.username
    };

    const token = generateToken(payload);

    res.status(200).json({ response, token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { aadharCardNumber, password } = req.body;

    const user = await User.findOne({ aadharCardNumber });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const payload = { id: user.id };
    const token = generateToken(payload);

    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// PROFILE (Protected)
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    res.status(200).json(user);

  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extract id from token

    const { currentPassword, newPassword } = req.body;

    // Find user
    const user = await User.findById(userId);

    // Check if current password is correct
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Update password
    user.password = newPassword;
    await user.save();
    
     console.log('password updated');
    res.status(200).json({ message: "Password updated successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;