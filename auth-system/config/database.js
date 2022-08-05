const mongoose = require("mongoose");
const { DATABASE_URL } = process.env;

exports.connect = () => {
  mongoose
    .connect(DATABASE_URL)
    .then(console.log(`DATABASE CONNECTED SUCCESSFULLY`))
    .catch((error) => {
      console.log(`DATABASE CONNECTION FAILED`);
      console.log({ error });
      process.exit(1);
    });
};
