'use strict';
const { Model } = require('sequelize');
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
        foreignKey: 'transactionId',
      };
      Transaction.belongsToMany(models.User, columnMapping);

      Transaction.hasMany(models.UsersTransaction, {
        foreignKey: 'transactionId',
      });
    }

    static async make(transactionData, creatorUserId) {
      const { cost, emails, reason } = transactionData;
      const users = [];
      const User = Transaction.sequelize.models.User;
      for (let email of emails) {
        const user = await User.findOne({
          where: {
            email: email.trim(),
          },
        });
        users.push(user);
      }
      const newTransaction = await Transaction.create(
        { cost, reason },
        { include: [User] }
      );

      users.map(async (user) => {
        if (user.id === creatorUserId) {
          await newTransaction.addUser(user, {
            through: {
              amountOwed: -1 * (cost / users.length) * (users.length - 1),
            },
          });
        } else {
          await newTransaction.addUser(user, {
            through: {
              amountOwed: cost / users.length,
            },
          });
        }
      });
      return newTransaction;
    }
  }
  Transaction.init(
    {
      cost: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
    }
  );

  return Transaction;
};
