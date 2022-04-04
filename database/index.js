const Sequelize = require('sequelize');
const config = require('config');

const db = new Sequelize(
    config.get('db.database'),
    config.get('db.user'),
    config.get('db.password'),
    {
        host: config.get('db.host'),
        dialect: config.get('db.connection')
    }
);

module.exports = db;