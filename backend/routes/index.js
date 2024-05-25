// backend/api/index.js
const express = require('express');
const userRouter= require('./userRouter')
const accountRouter = require("./Account");

const router = express.Router();
router.use("/user", userRouter)
router.use("/account", accountRouter);
module.exports = router;