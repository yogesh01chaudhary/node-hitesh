const express = require("express");
// const { get } = require("mongoose");
const app = express();
const fileUpload = require("express-fileUpload");
const cloudinary = require("cloudinary").v2;
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

cloudinary.config({
  //   cloud_name: process.env.CLOUD_NAME,
  cloud_name: "dqbx5m4wg",
  api_key: "197148532719866",
  api_secret: "yozNygwPBbT1jQ8npKQ5R5gCVQw",
});
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Welcome To Forms And Images");
});

app.get("/myGet", (req, res) => {
  console.log(req.body); //it will show us empty when we work on forms qyery gives us result in this case
  console.log(req.query); // it will not show us body shows us when working with forms using postman
  //   res.send(req.body);
  res.send(req.query);
});

app.post("/myPost", async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  let result;
  let imageArray = [];

  //case for multiple images
  if (req.files) {
    for (let index = 0; index < req.files.samplefile.length; index++) {
      let result = await cloudinary.uploader.upload(
        req.files.samplefile[index].tempFilePath,
        {
          folder: "users",
        }
      );
      imageArray.push({
        public_id: result.public_id,
        secure_url: public.secure_url,
      });
    }
  }

  //   use case for single image
  //   let file = req.files.samplefile;
  //   result = await cloudinary.uploader.upload(file.tempFilePath, {
  //     folder: "users",
  //   });

  console.log(result);
  const details = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    result,
    imageArray,
  };
  console.log(details);
  res.send(details);
});

app.get("/myGetForm", (req, res) => {
  res.render("getForm");
});

app.get("/myPostForm", (req, res) => {
  res.render("postForm");
});

app.listen(PORT, () => {
  console.log(`Server is running on port 3000`);
});
