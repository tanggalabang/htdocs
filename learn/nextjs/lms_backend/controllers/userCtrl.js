const { generateToken } = require("../config/jwtToken");
const validateMongodbId = require("../config/validateMongoDbId");
const User = require("../models/userModel");
const {sendEmail} = require("./emailCtrl");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");

/* Create A User */
const registerAUser = asyncHandler(async (req, res) => {
  /* Get the email from req.body and find whether a user with this email exists or not */
  const email = req.body.email;
  /* Find the user with this email get from req.body */
  const findUser = await User.findOne({
    email: email,
  });
  if (!findUser) {
    /* Create A User */
    const createUser = await User.create(req.body);
    res.status(200).json({
      status: true,
      message: "User Created Successfuly",
      createUser,
    });
  } else {
    throw new Error("User Already Exists!");
  }
});

/* Login A User */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  /* Chek if user exists or not */
  const findUser = await User.findOne({
    email: email,
  });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.status(200).json({
      status: true,
      message: "Logged In Successfuly",
      token: generateToken(findUser?._id),
      role: findUser._roles,
      username: findUser?.firstname + " " + findUser?.lastname,
      user_image: findUser?.user_image,
    });
  } else {
    throw new Error("invalid Credentials");
  }
});

/* Get All Users */
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const allUser = await User.find();
    res.status(200).json({
      status: true,
      message: "All User Fetched Successfuly",
      allUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

/* Get A User */
const getAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getProfile = await User.findById(id);
    res.status(200).json({
      status: true,
      message: "user found",
      getProfile,
    });
  } catch (Error) {
    throw new Error(error);
  }
});

/* Update A User Profile */
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: true,
      message: "Profile Update Successfuly",
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

/* Delete a user */
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "User Deleted Successfuly",
    });
  } catch (error) {
    throw new Error(error);
  }
});

/* Block a user */
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isblocked: true,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: true,
      message: "User blocked Successfuly",
    });
  } catch (Error) {
    throw new Error(error);
  }
});

/* unblock a user */
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isblocked: false,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: false,
      message: "User unblocked Successfuly",
    });
  } catch (Error) {
    throw new Error(error);
  }
});

/* update password */
const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);
  try {
    const user = await User.findById(_id);
    if (user && (await user.isPasswordMatched(password))) {
      throw new Error("Please provide a new password instead of old one.");
    } else {
      user.password = password;
      await user.save();
      res.status(200).json({
        status: true,
        message: "User Update Successfuly",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

/* forgot password  token */
const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({
    email: email,
  });
  if (!user) throw new Error("User Not Exists with this email."); 
  try {
    const token = await user.createPasswordResetToken(); 
    await user.save();
    const resetlink = `http://0.0.0.0:4000/api/user/reset-password/${token}`
    res.status(208).json(resetlink); 
    const data = {
      to: email,
      text: `Hey $(user.firstname +" "+ user.lastname)` ,
      subject: "forgot password",
      html: resetlink,
    };
    sendEmail(data);
  }
    catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const {token} = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {$gt: Date.now() },
  });
  if (!user) throw new Error("Token Expired, Please try again.");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires= undefined;
  await user.save();
  res.status(200).json({status: true, message: "Password Reset Successfuly"})
});

module.exports = {
  registerAUser,
  loginUser,
  getAllUser,
  getAUser,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
};
