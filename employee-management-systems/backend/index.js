require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
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
    User.create({
      username: 'admin',
      password: bcrypt.hashSync('admin123', 10),
      role: 'admin'
});

    console.log('Database synced');
  } catch (err) {
    console.error('DB sync error:', err);
  }
});
