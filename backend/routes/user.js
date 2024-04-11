const express = require("express");
const {
  signupValidation,
  signinValidation,
  updateValidation,
  firstNameValidation,
  lastNameValidation,
} = require("../validations/validations");
const { User, Accounts } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

const router = express.Router();

const authMiddleware = require("../middlewares/middleware");

//signup route
router.post("/signup", async (req, res) => {
  const unparsedBody = req.body;
  const parsedBody = signupValidation.safeParse(unparsedBody);

  if (!parsedBody.success) {
    return res.status(414).json({
      message: "Incorrect inputs",
    });
  }

  const userExists = await User.findOne({ username: unparsedBody.username });

  if (!userExists) {
    try {
      const user = await User.create({
        username: unparsedBody.username,
        firstName: unparsedBody.firstName,
        lastName: unparsedBody.lastName,
        password: unparsedBody.password,
      });

      await Accounts.create({
        userId: user._id,
        balance: 1 + Math.random() * 10000,
      });

      const token = jwt.sign({ userId: user._id }, JWT_SECRET);

      return res.status(200).json({
        message: "User created successfully",
        token: token,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
    } catch (err) {
      return res.status(414).json({
        message: "Error occured while saving user to db.",
      });
    }
  } else {
    return res.status(411).json({
      message: "Email already taken",
    });
  }
});

//signin route.
router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const parsedBody = signinValidation.safeParse(req.body);

  if (!parsedBody.success)
    return res.status(411).json({
      message: "Error while logging in",
    });

  try {
    const userExists = await User.findOne({
      username: username,
      password: password,
    });

    if (!userExists) {
      return res.status(411).json({
        message: "Error while logging in",
      });
    } else {
      const token = jwt.sign({ userId: userExists._id }, JWT_SECRET);

      return res.status(200).json({
        token: token,
        firstName: userExists.firstName,
        lastName: userExists.lastName,
      });
    }
  } catch (err) {
    return res.status(414).json({
      message: "unknown error while sign-in.",
    });
  }
});

//update route.
router.put("/", authMiddleware, async (req, res) => {
  const parsedBody = updateValidation.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  const userId = req.userId;

  try {
    await User.findOneAndUpdate({ _id: userId }, req.body);

    return res.status(200).json({
      message: "Updated successfully",
    });
  } catch (err) {
    return res.status(414).json({
      message: "Error while updating the user.",
    });
  }
});

//get user in bulk

router.get("/bulk", authMiddleware, (req, res) => {
  const filter = req.query.filter;

  if (filter == "") {
    User.find({})
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(411).json({
          message: "error getting data.",
        });
      });
  } else {
    const query = {
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
    };

    User.find(query)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(411).json({
          message: "error getting data.",
        });
      });
  }
});

module.exports = router;
