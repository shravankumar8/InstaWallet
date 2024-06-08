// backend/routes/user.js
const express = require("express");
const zod = require("zod");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const { User } = require("../db/schemas");

const { authMiddleware } = require("../middleware/middleware");
const { Account } = require("../db/bank.schema");
const { default: mongoose } = require("mongoose");
const Transaction = require("../db/transaction.schema");
const accountRouter = express.Router();
accountRouter.use(express.json());



accountRouter.get("/balance", authMiddleware, async (req, res) => {
  
  console.log(req.userId);
  const userAccount = await Account.findOne({ userId: req.userId });
  console.log(req.userId,"has requested balance enquery",userAccount.balance);
  res.json({
    balance: userAccount.balance,
  });
});



accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const { amount, to } = req.body;

  try {
    const currentAccount = await Account.findOne({ userId: req.userId });
    if(req.userId === to){
      return res.status(400).json({ msg: "Cannot transfer to self" });
    }
    if (currentAccount.balance < amount) {
      return res
        .status(403)
        .json({ msg: "Insufficient balance to complete the transaction." });
    }

    const toAccount = await Account.findOne({ userId: to });
    if (!toAccount) {
      return res.status(404).json({ msg: "The requested user was not found." });
    }
  
      
      await Account.updateOne({ userId: req.userId },{ $inc: { balance: -amount } });
      await Account.updateOne({ userId: to }, { $inc: { balance: amount } });
      console.log(amount ,"from ",req.userId," to ",to);



    const newTransaction=await new Transaction({
      sender:req.userId,
      receiver:to,
      amount:amount,
      status:"success",
      description:req.body.description
    })
    newTransaction
      .save()
      .then((savedTransaction) => {
        // console.log("Transaction saved succesfully.", savedTransaction);
        res
          .status(200)
          .json({ msg: "Transfer successful", transaction: savedTransaction });
      })
      .catch((error) => {
        console.error("Error saving transaction:", error);
        // Handle the error and send an error response
        res.status(500).json({ msg: "Failed to save transaction" }); // Assuming you are using Express and have access to res (response object)
      });


  } catch (error) {

    console.error("Transfer failed:", error);
    res.status(500).json({ msg: "Transfer failed", error });
  }

  // perform the transformer
});
accountRouter.post("/transactions", authMiddleware, async (req, res) => {
  try {
    
    const transactionId = req.body.transactionId;
    const transactionBody = await Transaction.findOne({ transaction})
    
    // console.log(transactionId);
      res.json(transactionBody );

  } catch (error) {
    console.log(error)
    res.status(200).json({ msg: "Transaction not found" });
  }
});

module.exports = accountRouter;
