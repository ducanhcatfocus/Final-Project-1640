const mongoose = require("mongoose");
// const validator = require('validator')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  avatar: { type: String, default: "avatar-default.jpg" },
  role: {
    type: String,
    enum: ["staff", "admin", "qam", "qac"],
    default: "staff",
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    // validate: [validator.isEmail, "Please Enter a valid email"],
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be greater than 6 characters"],
  },
  department: {
    type: String,
    default: null,
  },
  viewIdeas: [
    {
      idea_id: { type: Schema.Types.ObjectId },
      isLike: Boolean,
      isDislike: Boolean,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("user", UserSchema);
