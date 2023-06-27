const express = require("express");
const {
  registerAUser,
  loginUser,
  getAUser,
  getAllUser,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser,
  updatePassword,
  forgotPasswordToken,
  resetPassword
} = require("../controllers/userCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const userRouter = express.Router();

/* All Post Routes */
userRouter.post("/register", registerAUser);//
userRouter.post("/login", loginUser);//
userRouter.post("/forgot-password", forgotPasswordToken);

/* All Get Routes */
userRouter.get("/all-users", isAdmin, getAllUser);
userRouter.get("/:id", authMiddleware, getAUser);//

/* All Put Routes */
userRouter.put("/update-profile", authMiddleware, updateUser);//
userRouter.put("/block/:id", authMiddleware, isAdmin, blockUser);//
userRouter.put("/unblock/:id", authMiddleware, isAdmin, unblockUser);//
userRouter.put("/update-password", authMiddleware, updatePassword);//
userRouter.put ("/reset-password/:token", resetPassword);

/* all delete routes */
userRouter.delete("/:id", authMiddleware, isAdmin, deleteUser);//




module.exports = userRouter;
