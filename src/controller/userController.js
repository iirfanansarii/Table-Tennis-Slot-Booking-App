// import model
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// constants error message
const {
  mongodberror,
  userCreated,
  userNameExist,
  userLoggedIn,
  firstnameMissing,
  usernameMissing,
  passwordMissing,
} = require('../contants/constantErrorMessages');

// signup
exports.signup = (req, res) => {
  const { firstname, username, password } = req.body;
  if (!firstname){
    return res.status(400).json({
      message: firstnameMissing,
    });
  }
  if(!username){
    return res.status(400).json({
      message: usernameMissing,
    });
  }
  if(!password){
    return res.status(400).json({
      message: passwordMissing,
    });
  }
    User.findOne({ username: username }).exec((err, user) => {
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
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = new User({ firstname, username, password: hash });
      newUser.save((err, user) => {
        if (err) {
          return res.status(500).json({
            message: mongodberror,
            error: err,
          });
        }
        if (user) {
          return res.status(200).json({
            message: userCreated,
            user,
          });
        } else {
          return res.status(400).json({
            message: userCreationFailed,
          });
        }
      });
    });
};

// function to create access token
function createAccessToken(username) {
  return jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '5h',
  });
}

// sign in
exports.signin = (req, res) => {
  User.findOne({ username: req.body.username }).exec(async (err, user) => {
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
      const accessToken = await createAccessToken(req.body.username);
      return res.status(200).json({
        status: 1,
        userId: user._id,
        message: userLoggedIn,
        token: accessToken,
      });
    }
    return res.status(400).json({
      status: 0,
      message: userWrongCredential,
    });
  });
};
