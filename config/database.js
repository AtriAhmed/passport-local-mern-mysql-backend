const { Sequelize } = require("sequelize");

const host = process.env.DB_HOST,
    user = process.env.DB_USER,
    password = process.env.DB_PW,
    database = process.env.DB_NAME;

const sequelize = new Sequelize(database, user, password, {
    host,
    dialect: "mysql",
});

module.exports = sequelize;