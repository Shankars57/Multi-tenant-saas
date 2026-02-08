const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// GET /api/tasks
router.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    console.log("✅ Tasks query result:", result.rows);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error("❌ Tasks query failed:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Tasks query failed",
    });
  }
});

module.exports = router;
