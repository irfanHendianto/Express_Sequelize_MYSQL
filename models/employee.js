'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.belongsTo(models.Company,{
        foreignKey: 'company_id',
        onDelete: 'CASCADE'
      })
    }
  };
  Employee.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    Phone_number: DataTypes.STRING,
    jobtitle: DataTypes.ENUM(['manager', 'director', 'staff']),
    company_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};