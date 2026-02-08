const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./src/config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const projectsRoutes = require('./src/routes/projects');
const tasksRoutes = require('./src/routes/tasks');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api', projectsRoutes);
app.use('/api', tasksRoutes);

// Root check
app.get('/', (req, res) => {
  res.send('Backend running successfully');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
