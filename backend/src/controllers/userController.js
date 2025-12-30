const bcrypt = require('bcrypt');
const pool = require('../config/db');

// Create user
exports.createUser = async (req, res) => {
  const { email, password, fullName, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (tenant_id, email, password_hash, full_name, role)
       VALUES ($1,$2,$3,$4,$5) RETURNING id,email,full_name,role`,
      [req.user.tenantId, email, hashedPassword, fullName, role]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// List users
exports.listUsers = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id,email,full_name,role,is_active FROM users WHERE tenant_id=$1',
      [req.user.tenantId]
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { fullName, role, is_active } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET full_name=$1, role=$2, is_active=$3
       WHERE id=$4 AND tenant_id=$5 RETURNING id,email,full_name,role,is_active`,
      [fullName, role, is_active, req.params.id, req.user.tenantId]
    );
    if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Deactivate user
exports.deactivateUser = async (req, res) => {
  try {
    const result = await pool.query(
      `UPDATE users SET is_active=false WHERE id=$1 AND tenant_id=$2 RETURNING id,email,is_active`,
      [req.params.id, req.user.tenantId]
    );
    if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
