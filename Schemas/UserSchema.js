const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    },
    lastname: {
      type: String,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    },
    email: {
      type: String,
      required: [true, "can't be blank"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    validemailotp: {
      type: String,
      match: [/^[0-9]+$/, "is invalid"],
      default:null
    },
    isemailvalid: { type: Boolean, default: false },
    password: {
      type: String,
      required: [true, "can't be blank"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
