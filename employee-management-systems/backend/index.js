require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Add this import
const { sequelize, User } = require('./models'); // Only one import needed

const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log('Server running on port', PORT);
  try {
    await sequelize.sync();

    // Create admin user if not exists
    const adminExists = await User.findOne({ where: { username: 'admin' } });
    if (!adminExists) {
      await User.create({
        username: 'admin',
        password: bcrypt.hashSync('admin123', 10),
        role: 'admin'
      });
    }

    console.log('Database connected and synced successfully');
  } catch (err) {
    console.error('DB sync error:', err);
  }
});
