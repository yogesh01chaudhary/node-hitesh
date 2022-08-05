const express = require("express");
const app = express();
require("dotenv").config();
require("./config/database").connect();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserDB = require("./model/user");
const auth = require("./middleware/auth");

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("<h1>Hello Radhey Welcome to Auth System</h1>");
});

app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!(email && password && firstname && lastname)) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const existingUser = await UserDB.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(401).send({ message: "User already exists" });
    }
    //Password hashing
    const myEncryptPswd = await bcrypt.hash(password, 10);
    const user = await UserDB.create({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password: myEncryptPswd,
    });

    //token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.password = undefined;
    user.token = token;
    // save token in DB update the user
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send({ error: e.name });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send({ message: "Please fill the fields" });
    }

    const user = await UserDB.findOne({ email: email.toLowerCase() });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.SECRET_KEY,
        { expiresIn: "2h" }
      );

      user.token = token;
      user.password = undefined;
      //   res.status(200).send({ message: "Logged In Successfull", user });

      //if you want to use cookies
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      return res
        .status(200)
        .cookie("token", token, options)
        .json({ success: true, token, user });
    }
    res.status(400).send({ message: "Invalid Credentials" });
  } catch (e) {
    res.status(500).send({ error: e.name, message: "Something went wrong" });
  }
});

app.get("/dashboard", auth, (req, res) => {
  res.send({ message: "Welcome to secret information" });
});

module.exports = app;
