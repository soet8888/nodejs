const Sequelize = require('sequelize')
const path = require('path')
const dbFile = path.join(__dirname, 'test.db')
const sequelize = new Sequelize('database', 'username', 'password', {
    // sqlite! now!
    dialect: 'sqlite',

    // the storage engine for sqlite
    // - default ':memory:'
    storage: dbFile
})
module.exports = sequelize