const express = require('express');
const router = express.Router();
const { getTenant, updateTenant, listTenants } = require('../controllers/tenantController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/:id', authMiddleware, getTenant);
router.put('/:id', authMiddleware, updateTenant);
router.get('/', authMiddleware, listTenants);

module.exports = router;
