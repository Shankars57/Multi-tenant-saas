// genToken.js
const jwt = require('jsonwebtoken');

// match your app’s expected payload
const payload = {
  userId: 1,
  tenantId: 1,
  role: 'admin'
};

// use the same secret your backend uses
const secret = process.env.JWT_SECRET || 'secret';

// 24h token
const token = jwt.sign(payload, secret, { expiresIn: '24h' });

console.log('JWT:', token);
