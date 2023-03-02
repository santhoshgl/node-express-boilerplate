const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
  },
  { versionKey: false }
);
const Users = mongoose.model("users", UserSchema);

module.exports = Users;
