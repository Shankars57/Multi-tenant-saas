const express = require('express');
const router = express.Router();
const { createUser, listUsers, updateUser, deactivateUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Create user
router.post('/', authMiddleware, createUser);

// List users
router.get('/', authMiddleware, listUsers);

// Update user
router.put('/:id', authMiddleware, updateUser);

// Deactivate user
router.delete('/:id', authMiddleware, deactivateUser);

module.exports = router;
