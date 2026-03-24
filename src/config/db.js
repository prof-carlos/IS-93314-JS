require('dotenv').config(); // Carrega as variáveis do .env
const { Sequelize } = require('sequelize');

class Database {
    constructor() {
        this.sequelize = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASS,
            {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                dialect: 'mysql',
                logging: false
            }
        );
    }
}

module.exports = new Database().sequelize;