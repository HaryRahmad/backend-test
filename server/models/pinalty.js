'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pinalty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pinalty.belongsTo(models.Member, { foreignKey: 'memberId', targetKey: 'id' });
    }
  }
  Pinalty.init({
    memberId: DataTypes.INTEGER,
    pinaltyEnd: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Pinalty',
  });
  return Pinalty;
};