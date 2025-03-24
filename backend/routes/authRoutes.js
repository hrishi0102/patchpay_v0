// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUserProfile,
  updatePaymanApiKey
} = require('../controllers/authController');
const { protect, isCompany } = require('../middleware/auth');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/update-api-key', protect, isCompany, updatePaymanApiKey);

module.exports = router;