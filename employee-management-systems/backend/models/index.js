const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS, {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
});

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin','employee'), defaultValue: 'employee' }
});

const Employee = sequelize.define('Employee', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  position: { type: DataTypes.STRING },
  salary: { type: DataTypes.DECIMAL(10,2) }
});

module.exports = { sequelize, User, Employee };
