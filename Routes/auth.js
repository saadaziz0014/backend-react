const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { findOne } = require("../models/User");
const bcrypt = require('bcryptjs');
const secretC = "SaadisF@ir";
const jwt = require("jsonwebtoken");

//add data from api/auth/createuser
router.post(
  "/createuser",
  [
    body("email", "enter valid email").isEmail(),
    body("password", "password length must be 8").isLength({ min: 8 }),
    body("name", "name length must be 5").isLength({ min: 4 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res.status(400).json({ error: "User with this email already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secP = await bcrypt.hash(req.body.password,salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secP,
      });
      const data = {
        user:{
          id: user.id
        }
      }
      const token = jwt.sign(data,secretC);
      res.json({token});
    } catch (err) {
      console.error(err.message);
      res.status(400).send("Error occured");
    }
  }
);

module.exports = router;
