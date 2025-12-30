const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// GET /api/projects
router.get('/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects');
    console.log('✅ Projects query result:', result.rows);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error('❌ Projects query failed:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Projects query failed',
    });
  }
});

module.exports = router;
