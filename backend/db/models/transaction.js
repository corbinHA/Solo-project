'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const columnMapping = {
        through: 'UsersTransaction',
        otherKey: 'userId',
        foreignKey: 'transactionId'
      }
      Transaction.belongsToMany(models.User, columnMapping)
    }
  };
  transaction.init({
    cost: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' },
    },
  }, {
    sequelize,
    modelName: 'transaction',
  });

  return Transaction;
};
