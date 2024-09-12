'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Borrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Borrow.belongsTo(models.Member, { foreignKey: 'codeMembers', targetKey: 'code' });
      Borrow.belongsTo(models.Book, { foreignKey: 'codeBooks', targetKey: 'code' });
    }
  }
  Borrow.init({
    codeMembers: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'Code Members cannot be null'
        },notEmpty:{
          msg: 'Code Members cannot be empty'
        }
      }
    },
    codeBooks: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'Code Books cannot be null'
        },notEmpty:{
          msg: 'Code Books cannot be empty'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'Status cannot be null'
        },notEmpty:{
          msg: 'Status cannot be empty'
        }
    },  
    }
  }, {
    sequelize,
    modelName: 'Borrow',
  });
  return Borrow;
};