require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sequelize, User } = require('./models');

async function seed() {
  await sequelize.sync();
  const exists = await User.findOne({ where: { username: 'admin' }});
  if (exists) { console.log('Admin exists'); process.exit(0); }
  const pass = await bcrypt.hash('admin123', 10);
  await User.create({ username: 'admin', password: pass, role: 'admin' });
  console.log('Seeded admin user -> username: admin, password: admin123');
  process.exit(0);
}
seed();
