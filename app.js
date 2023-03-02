var express = require("express");
const mongoose = require("mongoose");

const UserRoute = require("./Routes/User.route");

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

const mongoDB =
  "mongodb+srv://root:root@cluster0.sib0u.mongodb.net/playing?retryWrites=true&w=majority";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
  console.log("Connected");
}
