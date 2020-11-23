'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UsersTransactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' },
      },
      transactionId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references: { model: 'Transactions' },
      },
      amountOwed: {
        allowNull:false,
        type: Sequelize.NUMERIC(6, 2),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UsersTransactions');
  }
};
