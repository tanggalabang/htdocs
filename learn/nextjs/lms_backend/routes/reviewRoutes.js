const reviewRouter = require("express").Router();
const {
  createReview,
  getAllReviews,
  getAReview,
  deleteAReview,
  updateReviewStatus
} = require("../controllers/reviewCtrl");
const {
  authMiddleware,
  isAdmin
} = require("../middlewares/authMiddleware");

reviewRouter.post("/", authMiddleware, createReview);
reviewRouter.get("/", getAllReviews);
reviewRouter.get("/:id", authMiddleware, isAdmin, getAReview);
reviewRouter.delete("/:id", authMiddleware, isAdmin, deleteAReview);
reviewRouter.put("/:id", authMiddleware, isAdmin, updateReviewStatus);

module.exports = reviewRouter;