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
    const userEmail = req.user.email;
    const creatorId = req.user.id
    req.body.emails.push(userEmail);
    const newTransaction = await Transaction.make(req.body, creatorId);
    res.json(newTransaction);
  }))

  module.exports = router
