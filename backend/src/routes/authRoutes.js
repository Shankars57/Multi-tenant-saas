const express = require('express');
const router = express.Router();

// Example auth route
router.post('/login', (req, res) => {
  res.json({ success: true, message: 'Login route working' });
});

module.exports = router;
