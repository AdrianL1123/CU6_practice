const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 8888;

app.use(express.json());

// instruction: setup cors
const corsHandler = cors({
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: true,
  optionsSuccessStatus: 200,
});
app.use(corsHandler);

// instruction: setup MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/cu6")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

// instruction: setup routes
const courseRouter = require("./routes/courses");
app.use("/courses", courseRouter);

const instructorRouter = require("./routes/instructors");
app.use("/instructors", instructorRouter);

app.get("/", (req, res) => {
  res.send("Good luck!");
});

// Server listening
app.listen(port, () => console.log(`Server started on port ${port}`));
