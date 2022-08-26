const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  [
    body("email", "enter valid email").isEmail(),
    body("password", "password length must be 8").isLength({ min: 8 }),
    body("name", "name length must be 5").isLength({ min: 4 }),
  ],
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then((user) => res.json(user));
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;
