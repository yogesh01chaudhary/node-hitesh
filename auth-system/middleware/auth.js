const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  console.log(req.cookies);
  const token =
    req.cookies.token ||
    req.body.token ||
    req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    res.status(403).send({ message: "token is missing" });
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;
    //brin in info from DB
    console.log({ decode });
  } catch (e) {
    return res.status(401).send({ message: "Invalid token" });
  }
  return next();
};

module.exports = auth;
