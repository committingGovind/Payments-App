const { Router } = require("express");
const mongoose = require("mongoose");
const { Accounts } = require("../db");

const router = Router();

const authMiddleware = require("../middlewares/middleware");

router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;

  try {
    const account = await Accounts.findOne({ userId: userId });

    return res.status(200).json({
      balance: account.balance,
    });
  } catch (err) {
    return res.status(411).json({
      message: "Error while getting the balance.",
    });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  // Fetch the accounts within the transaction
  const account = await Accounts.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Accounts.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  // Perform the transfer
  await Accounts.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Accounts.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  // Commit the transaction
  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
});

module.exports = router;

//govind:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjE0MmRiMjY1MjM4MjQyODZkMDRkYjgiLCJpYXQiOjE3MTI2MDIzOTl9.hOBlqUn29lSeNpYAp9Q0ujrg_jYOapyrphR4ju_sk34

//shivam: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjE0MmQ4ZjY1MjM4MjQyODZkMDRkYjMiLCJpYXQiOjE3MTI2MDI0NzN9.qyJwL9YnSMRIyML50zZVGU41BhU18pkD7_BySHYkdWw

//shivani: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjE0MmRlNjY1MjM4MjQyODZkMDRkYmQiLCJpYXQiOjE3MTI2MDI1MDJ9.fqAevmcKOh2839_vqCBfYljrDgpbjPmMx4rAQpmTeKA
