const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { promisify } = require("util");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res, isNewUser) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: "success",
    jwtToken: token,
    isNewUser,
    data: {
      user,
    },
  });
};

exports.login = async (req, res, next) => {
  try {
    const oAuth2Client = new OAuth2Client();

    // console.log(process.env.GOOGLE_CLIENT_ID);
    const result = await oAuth2Client.verifyIdToken({
      idToken: req.body.credential,
      expectedAudience: process.env.GOOGLE_CLIENT_ID,
    });
    let isNewUser = false;
    let userFind = await User.findOne({ email: result.payload.email });

    if (!userFind) {
      isNewUser = true;
      const usr = await User.create({
        displayName: result.payload.name,
        image: result.payload.picture,
        googleId: result.payload.sub,
        email: result.payload.email,
        firstName: result.payload.name.split(" ")[0],
      });
      userFind = usr;
    }

    createSendToken(userFind, 200, res, isNewUser);
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: "error occured", message: err });
  }
};

const isLoggedIn = async (req, res) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    try {
      // 1) verify token
      // console.log(process.env.JWT_SECRET)
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return false;
      }

      // THERE IS A LOGGED IN USER
      return currentUser;
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  return false;
};

exports.protect = async (req, res, next) => {
  // checking if user is logged in
  const logged = isLoggedIn(req, res);
  if (!logged) {
    res.status(404).json({
      status: "fail",
      message: "You are not logged in, Please log in to continue",
    });
  }
  req.user = await logged;
  next();
};
