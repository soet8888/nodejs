
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path')
const _ = require('lodash')
const sequelize = new Sequelize('sqlite:' + path.join(__dirname, 's.db'), { logging: false })

const db = {}
fs.readdirSync('./models')
    .map(fileName => {
        let model = require('./models/' + fileName);
        if (model.init) {
            model.init(sequelize, Sequelize.DataTypes);
        } else {
            model(sequelize, Sequelize);
        }
    });
// associate
const models = sequelize.models;
_.map(Object.keys(models), n => models[n])
    .filter(m => m.associate !== undefined)
    .forEach(m => m.associate(models));
db.models = models
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
