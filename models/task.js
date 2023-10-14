'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Task.belongsTo(models.User,{
        foreignKey:{
          allowNull: false,
          name:"UserId"
        }
      })
    }
  }
  Task.init({
    UserId: {
      type: DataTypes.INTEGER
    },
    
    task_name: DataTypes.STRING,
    starting_date: DataTypes.STRING,
    ending_date: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};