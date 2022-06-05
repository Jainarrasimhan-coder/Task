const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

// //body parser
app.use(express.json());

let connectDB = () => {
  // Connect to DB
  let connectionOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };

  mongoose
    .connect("mongodb+srv://jai:jai@cluster0.rnsuhje.mongodb.net/?retryWrites=true&w=majority", connectionOptions)
    .then(() => {
      console.log("Connected to mongodb");
    })
    .catch((err) => {
      console.log("Failed to connect mongodb", err);
    });
};

//connect DB
connectDB();

//cors
app.use(cors());

app.use("/api/auth", require("./routes/auth.router"));

const PORT = process.env.PORT || 8000;

app.use(function (err, req, res, next) {
  console.log("ErrorCatch", err);
  if (process.env.NODE_ENV === "production") {
    res.status(500).send({ desc: err.desc || "Something Went Wrong" });
    logger.error(JSON.stringify(log));
  } else {
    res
      .status(500)
      .send({ desc: err.desc, stack: err.stack, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log("app listening on port " + PORT);
});
