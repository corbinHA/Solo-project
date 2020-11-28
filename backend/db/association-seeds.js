const { User, Transaction, UsersTransaction} = require('./models');

module.exports = async () => {
  await UsersTransaction.destroy({where: {}});
  await User.destroy({where: {}});
  await Transaction.destroy({where: {}});

  const userA = await User.signup({
    firstName: 'alvin',
    lastName: 'zablan',
    username: 'azab',
    email: 'azablan.dev@gmail.com',
    password: 'password123'
  });

  const userB = await User.signup({
    firstName: 'corbin',
    lastName: 'arma',
    username: 'carma',
    email: 'corbin.dev@gmail.com',
    password: 'password123'
  });

  const userC = await User.signup({
    firstName: 'ethan',
    lastName: 'shultz',
    username: 'eshultz',
    email: 'ethan.dev@gmail.com',
    password: 'password123',
  });

  await Transaction.make(
    {
      cost: 60,
      reason: 'food',
      emails: [userA.email, userB.email, ]
    },
    userA.id
  );

  await Transaction.make(
    {
      cost: 40,
      reason: 'food again',
      emails: [userA.email, userB.email],
    },
    userB.id
  );

  await Transaction.make(
    {
      cost: 60,
      reason: 'tripleee!',
      emails: [userA.email, userB.email, userC.email],
    },
    userA.id
  );

};
