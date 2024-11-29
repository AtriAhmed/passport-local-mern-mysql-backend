const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AccessLevel = require('./AccessLevel');

const User = sequelize.define('User', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  accessId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: AccessLevel,
      key: 'permissionLevel'
    }
  }
},
  {
    tableName: "users",
    timestamps: false,
  });

User.belongsTo(AccessLevel, { foreignKey: 'accessId' });


module.exports = User;