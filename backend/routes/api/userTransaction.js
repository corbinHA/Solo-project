const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Transaction, UsersTransaction, User } = require('../../db/models');

const router = express.Router();

router.get(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const history = await UsersTransaction.findAll({
      where: {
        userId: req.user.id,
      },
    });
    const result = [];
    for (h of history) {
      const txn = await Transaction.findByPk(h.transactionId, {
        include: {
          model: UsersTransaction,
        },
      });
      const users = [];
      for (utx of await txn.getUsersTransactions()) {
        if (utx.userId !== req.user.id) {
          const user = await User.findByPk(utx.userId);
          users.push({
            userId: utx.userId,
            amountOwed: utx.amountOwed,
            email: user.email,
          });
        }
      }
      console.log(users)
      const completeTransaction = {};
      completeTransaction['total_amount'] = txn.cost;
      completeTransaction['reason'] = txn.reason;
      completeTransaction['amount_owed'] = h.amountOwed;
      completeTransaction['other_users'] = users;
      result.push(completeTransaction);
    }
    res.json(result);
  })
);

module.exports = router;
