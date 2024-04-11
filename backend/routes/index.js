const express = require("express");

const router = express.Router();

const userRoute = require("./user");

const balanceRoute = require("./accouts");

router.use("/user", userRoute);

router.use("/account", balanceRoute);

module.exports = router;
