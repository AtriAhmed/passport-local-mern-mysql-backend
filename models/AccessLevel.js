const { Model, DataTypes } = require("sequelize");

const db = require("../config/database");

const AccessLevel = db.define('accessLevel', {
    permissionLevel: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
})

module.exports = AccessLevel
