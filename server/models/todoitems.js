'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TodoItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TodoItems.belongsTo(models.Todos,{
        foreignKey:'todoId',
      })
      // TodoItems.belongsTo(models.Users,{
      //   foreignKey:'userId',
      // })
    }
  }
  TodoItems.init({
    content: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'TodoItems',
  });
  return TodoItems;
};