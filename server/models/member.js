'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Member.hasMany(models.Borrow, { foreignKey: 'codeMembers',sourceKey: 'code'});
      Member.hasMany(models.Pinalty, { foreignKey: 'memberId',sourceKey: 'id'});
    }
  }
  Member.init({
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'Name cannot be null'
        },notEmpty:{
          msg: 'Name cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};