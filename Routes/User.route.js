const express = require("express");
const UserModel = require("../Models/User.model");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Getting all the users...");
});

router.post("/", (req, res) => {
  let data = req.body;
  const userCreate = new UserModel({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phoneNumer: data.phoneNumer,
  });
  userCreate
    .save()
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
