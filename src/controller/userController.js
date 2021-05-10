// import model
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// constants error message
const {
  mongodberror,
  userCreated,
  userNameExist,
  userLoggedIn,
} = require('../contants/constantErrorMessages');

// signup
exports.signup = (req, res) => {
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) {
      return res.status(500).json({
        status: 0,
        message: mongodberror,
        error: err,
      });
    }
    if (user) {
      return res.status(400).json({
        status: 0,
        message: userNameExist,
      });
    }
    const { name, username, password } = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ name, username, password: hash });
    newUser.save((err, user) => {
      if (err) {
        return res.status(500).json({
          status: 0,
          message: mongodberror,
          error: err,
        });
      }
      return res.status(201).json({
        status: 1,
        message: userCreated,
        user,
      });
    });
  });
};

// sign in
exports.signin = (req, res) => {
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) {
      return res.status(500).json({
        status: 0,
        message: mongodberror,
        error: err,
      });
    }
    const { password } = req.body;
    const userPass = user.password;
    const pass = bcrypt.compareSync(password, userPass);
    if (pass === true) {
      return res.status(200).json({
        status: 1,
        message: userLoggedIn,
      });
    }
    return res.status(400).json({
      status: 0,
      message: userWrongCredential,
    });
  });
};
