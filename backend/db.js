const mongoose = require("mongoose");

try {
  mongoose.connect(
    "mongodb+srv://coderKazama:Jaipur24@cluster0.qwwivkv.mongodb.net/Paytm"
  );
} catch (err) {
  throw new Error("Error occured white connecting to db.");
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  firstName: { type: String, required: true, trim: true, maxLength: 50 },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

const User = mongoose.model("User", userSchema);

const accountSchema = new mongoose.Schema({
  balance: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Accounts = mongoose.model("Accounts", accountSchema);

module.exports = {
  User,
  Accounts,
};
