const app = require("./app");

const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
