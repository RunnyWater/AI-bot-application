const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/AuthController');
const authenticateToken = require('../middleware/authenticateToken');

// Public route
router.post('/login', loginUser);

// Protected route
router.get('/protected', authenticateToken, (req, res) => {
 res.json({ message: 'This is a protected route' });
});

module.exports = router;