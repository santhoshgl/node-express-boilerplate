var express = require("express");
const mongoose = require("mongoose");

const UserRoute = require("./Routes/User.route");
require("dotenv").config();

var app = express();
// To parse JSON value
app.use(express.json());

app.use("/users", UserRoute);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(3000, () => {
  console.log("Server started and Listenting on port 3000");
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected");
}
