'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.hasMany(models.Borrow, {foreignKey: 'codeBooks',sourceKey: 'code'});
    }
  }
  Book.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notNull:{
          msg: 'Code cannot be null'
        },notEmpty:{
          msg: 'Code cannot be empty'
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'Title cannot be null'
        },notEmpty:{
          msg: 'Title cannot be empty'
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'Author cannot be null'
        },notEmpty:{
          msg: 'Author cannot be empty'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'Stock cannot be null'
        },notEmpty:{
          msg: 'Stock cannot be empty'
        },isInt:{
          msg: 'Stock must be a number'
        },min:{
          args: [0],
          msg: 'Stock must be greater than or equal to 0'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};