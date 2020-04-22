const Model = require('sequelize').Model
class Employee extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            firstname: DataTypes.TEXT,
            lastname: DataTypes.TEXT
        }, { sequelize, modelName: "Employee", tableName: "employee" });
    }
    static getAll(where) {
        return super.findAll(
            {
                where: where
            }
        )
    }
    static getById(id) {
        return super.findOne({
            where: {
                id: id
            }
        })

    }
    static update(para, id) {
        return super.update(
            para
            , {
                where: {
                    id: id
                }
            }
        )
    }
    static delete(id) {
        return super.destroy({
            where: {
                id: id
            }
        })
    }
    static associate(models) {
        this.belongsToMany(models.User, { through: 'id' });
    }
}
module.exports = Employee