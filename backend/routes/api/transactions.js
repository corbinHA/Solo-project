const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Transaction, UsersTransaction, User } = require("../../db/models");

const router = express.Router();


router.post(
  '/create',
  requireAuth,
  asyncHandler( async(req, res) => {
    const {cost, emails, reason } = req.body
    const emailArr = emails.split(',');
    const users = []
    for (email of emailArr) {
      const user = await User.findOne({
        where: {
          email: email.trim()
        }
      })
      users.push(user)
    }
    const transaction = await Transaction.create({cost, reason}, {include: [User]})
    users.map(async(user) =>  {
      if (user.id === req.user.id) {
        await transaction.addUser(user, {
          through: {
            amountOwed: -1 * (cost / users.length) * (users.length - 1)
          }
        })
      } else {
        await transaction.addUser(user, {
          through: {
            amountOwed: cost / users.length
          }
        })
      }
    })
    res.json(transaction)
  }))

  module.exports = router
