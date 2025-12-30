const pool = require('../config/db');

// Get tenant details
exports.getTenant = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tenants WHERE id=$1', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Tenant not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update tenant
exports.updateTenant = async (req, res) => {
  const { name, subscription_plan, max_users, max_projects } = req.body;
  try {
    const result = await pool.query(
      `UPDATE tenants SET name=$1, subscription_plan=$2, max_users=$3, max_projects=$4 WHERE id=$5 RETURNING *`,
      [name, subscription_plan, max_users, max_projects, req.params.id]
    );
    if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Tenant not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// List all tenants
exports.listTenants = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tenants');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
