'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UsersTransaction.belongsTo(models.User, { foreignKey: 'userId' });
      UsersTransaction.belongsTo(models.Transaction, { foreignKey: 'transactionId' });
    }
  };
  UsersTransaction.init({
    userId: DataTypes.INTEGER,
    transactionId: DataTypes.INTEGER,
    amountOwed: DataTypes.NUMERIC
  }, {
    sequelize,
    modelName: 'UsersTransaction',
  });
  return UsersTransaction;
};
