const Sequelize = require('sequelize')
const db = require('../config/database')

const employee = db.define('emp', {
    name: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.INTEGER
    },
    department: {
        type: Sequelize.STRING
    },
    position: {
        type: Sequelize.STRING
    },
})