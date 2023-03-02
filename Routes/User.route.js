const express = require("express");
const User = require("../Models/User.model");
const router = express.Router();

// Fetch all the users from the database.
router.get("/", async (req, res, next) => {
  try {
    // Incase if we want to remove projection for __V
    const results = await User.find({}, { __V: 0 });

    // Send only those values you want by 0 or 1 in the projection
    // const results = await User.find(
    //   {},
    //   { firstName: 1, lastName: 1, email: 1, phoneNumer: 1 }
    // );

    // Fetch only the values you need in the query parameter
    // const results = await User.find(
    //   { firstName: "santhosh" },
    //   { firstName: 1, lastName: 1, email: 1, phoneNumer: 1 }
    // );
    res.send(results);
  } catch (error) {}
});

// Fetch the user based on the userID
router.get("/:userID", async (req, res, next) => {
  const userID = req.params.userID;
  let results = {};
  try {
    // Fetching results based on findById
    //const results = await User.findById(userID);
    // Fetching results based on findOne
    results = await User.findOne({ _id: userID });
    console.log("no record", results);
    if (results === null) {
      results = {
        error: {
          status: 404,
          message: "Record not found",
        },
      };
    }
    res.send(results);
  } catch (error) {
    res.send(error);
  }
});

// Create the user
router.post("/", (req, res) => {
  let data = req.body;
  const userCreate = new User({
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

// Delete the user based on the ID
router.delete("/:userID", async (req, res, next) => {
  const userID = req.params.userID;
  try {
    // You can delete the user based on findByIdAndDelete
    // You can delete the user based on
    const results = await User.findByIdAndDelete(userID);
    res.send(results);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
