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
    const transactionHistory = await UsersTransaction.findAll({
      where: {
        userId: req.user.id,
      },
    });
    const result = [];
    for (let transaction of transactionHistory) {
      const txn = await Transaction.findByPk(transaction.transactionId, {
        include: {
          model: UsersTransaction,
        },
      });
      for (let otherUser of await txn.getUsersTransactions()) {
        if (otherUser.userId === req.user.id) continue;

        const user = await User.findByPk(otherUser.userId);
        const otherUserObj = {
          userId: otherUser.userId,
          amountOwed: otherUser.amountOwed,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };
        //transaction.amountOwed
        const completeTransaction = {};
        completeTransaction.reason = txn.reason;
        completeTransaction.amountOwed = transaction.amountOwed > 0 ? transaction.amountOwed : otherUserObj.amountOwed;
        completeTransaction.type = transaction.amountOwed > 0 ? "debt" : "asset";
        completeTransaction.otherUser = otherUserObj;
        result.push(completeTransaction);
      }
    }
    res.json(result);
  })
);

module.exports = router;
