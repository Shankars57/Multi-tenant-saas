const jwt = require('jsonwebtoken');
const pool = require('../db'); // adjust path if needed

// =======================
// Register (optional, not needed for demo)
// =======================
exports.register = async (req, res) => {
  const { email, password, fullName, role, tenantSubdomain } = req.body;
  try {
    const tenant = await pool.query(
      'SELECT id FROM tenants WHERE subdomain=$1',
      [tenantSubdomain]
    );
    if (tenant.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Tenant not found' });
    }

    const newUser = await pool.query(
      'INSERT INTO users (tenant_id, email, password_hash, full_name, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, full_name, role, tenant_id',
      [tenant.rows[0].id, email, password, fullName, role] // plain text for demo
    );

    res.json({ success: true, data: newUser.rows[0] });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// =======================
// Login (plain text check for demo)
// =======================
exports.login = async (req, res) => {
  const { email, password, tenantSubdomain } = req.body;
  try {
    // Find tenant
    const tenant = await pool.query(
      'SELECT id FROM tenants WHERE subdomain=$1',
      [tenantSubdomain]
    );
    if (tenant.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Tenant not found' });
    }

    // Find user
    const user = await pool.query(
      'SELECT id, tenant_id, email, password_hash, full_name, role FROM users WHERE email=$1 AND tenant_id=$2',
      [email, tenant.rows[0].id]
    );

    if (user.rowCount === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // 🔍 Debug logs go here
    console.log('Login request:', { email, password, tenantSubdomain });
    console.log('Tenant row:', tenant.rows[0]);
    console.log('User row:', user.rows[0]);

    // TEMP FIX: plain text password check for demo
    if (password !== 'demo123') {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.rows[0].id, tenantId: user.rows[0].tenant_id, role: user.rows[0].role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      data: {
        user: {
          id: user.rows[0].id,
          email: user.rows[0].email,
          fullName: user.rows[0].full_name,
          role: user.rows[0].role,
          tenantId: user.rows[0].tenant_id
        },
        token,
        expiresIn: 86400
      }
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
