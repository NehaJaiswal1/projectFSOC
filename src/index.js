const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const port = process.env.PORT || 3000;
const route = require("./route/jobroute");
mongoose.set("strictQuery", true);
const app = express();

app.use(express.json());
app.use(multer().any());

mongoose
  .connect(
    "mongodb+srv://nehajaiswal:neha123@nehadb.pcorgpc.mongodb.net/FSOC",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("mongoDB is connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/", route);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

