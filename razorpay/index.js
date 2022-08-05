const express = require("express");
const Razorpay = require("razorpay");
// require("./public/index.html");
const app = express();
app.use(express.static("./public"));
app.use(express.json());

const PORT = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.send("Hello Radhey>>> Welcome to RazorPay");
// });

app.post("/order", async (req, res) => {
  const amount = req.body.amount;
  var instance = new Razorpay({
    key_id: "YOUR_KEY_ID",
    key_secret: "YOUR_SECRET",
  });

  var options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  //   instance.orders.create(options, function (err, order) {
  //     console.log(order);
  //   });

  const myOrder = await instance.orders.create(options);
  res.status(200).json({
    success: true,
    amount,
    order: myOrder,
  });
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
