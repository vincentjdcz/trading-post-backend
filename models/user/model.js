const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  posts: {
    type: [String], // Array of strings
    default: [],    // Optional: starts as an empty array if not provided
  },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;