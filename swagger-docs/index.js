const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const fileUpload = require("express-fileupload");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileUpload());

let courses = [
  { id: "11", name: "Learn React js", price: 299 },
  { id: "22", name: "Learn JavaScript", price: 399 },
  { id: "33", name: "Learn React JS", price: 199 },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("Hello Radhey");
});

app.get("/api/v1/lco", (req, res) => {
  res.status(200).json("Hello Swagger Docs");
});

app.get("/api/v1/lco", (req, res) => {
  res.status(200).json({ id: 55, name: "LearnNode", price: 99 });
});

app.get("/api/v1/courses", (req, res) => {
  res.status(200).json(courses);
});

app.get("/api/v1/mycourse/:courseId", async (req, res) => {
  const myCourse = await courses.find((course) => {
    course.id === req.params.courseId;
    console.log(course.id, req.params.courseId);
  });
  // res.send("hello");
  console.log(myCourse);
  res.status(200).json(myCourse);
});

app.post("/api/v1/addCourse", (req, res) => {
  console.log(req.body);
  courses.push(req.body);
  res.send(req.body);
});

app.get("/api/v1/courseQuery", (req, res) => {
  let location = req.query.location;
  let device = req.query.device;
  res.send({ location, device });
});

app.post("/api/v1/courseUpload", (req, res) => {
  const file = req.files.file;
  console.log(file);
  let path = __dirname + "/images/" + Date.now() + ".jpg";
  file.mv(path, (err) => {
    res.send(true);
  });
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
