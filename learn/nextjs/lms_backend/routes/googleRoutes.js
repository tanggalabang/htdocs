const googleRouter = require("express").Router();
const passport = require("passport");
const {
  generateToken
} = require("../config/jwtToken");
const User = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");

googleRouter.get(
  "/login/success",
  expressAsyncHandler(async (req, res) => {
    console.log("success");
    res.status(200).json( {
      status: true, message: "login success"
    });
  })
);
googleRouter.get(
  "/login/failed",
  expressAsyncHandler(async (req, res) => {
    res.status(401).json( {
      status: false, message: "Login failed"
    });
  })
);

googleRouter.get(
  "/google",
  passport.authenticate("google", ["profile", "email"])
);

googleRouter.get(
  "/auth/google/callback",
  expressAsyncHandler(async (req, res) => {
    await passport.authenticate("google", {
      successRedirect: "/login/success",
      failureRedirect: "/login/failed",
    });
  })
);

googleRouter.get(
  "/Logout",
  expressAsyncHandler(async (req, res) => {
    req.logout();
    res.redirect("/");
  })
);

module.exports = googleRouter;