'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Eric',
        lastName: 'Clapton',
        balance: 500.00,
      },
      {
        email: 'demo2@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password123'),
        firstName: 'Scott',
        lastName: 'Sterling',
        balance: 500.00,
      },
      {
        email: 'demo3@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password123'),
        firstName: 'Jessica',
        lastName: 'White',
        balance: 500.00,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
