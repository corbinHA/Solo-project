const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Transaction } = require("../../db/models");

const router = express.Router();


router.post(
  '/create',
  requireAuth,
  asyncHandler( async(req, res) => {
    console.log(req.json())
    const transaction = Transaction.create({cost, reason, userId})
  })
  )
