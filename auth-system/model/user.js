const { Schema, model } = require("mongoose");
const userSchema = Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
});

module.exports = model("user", userSchema);
