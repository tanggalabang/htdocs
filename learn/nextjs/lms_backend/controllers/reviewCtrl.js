const Review = require("../models/reviewModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../config/validateMongoDbId");

// create Review
const createReview = asyncHandler(async (req, res) => {
  const {
    _id
  } = req.user;
  validateMongoDbId(_id);
  try {
    let data = {
      user: _id,
      comment: req.body.comment,
      color: req.body.color
    };
    const review = await Review.create(data);
    res.status(200).json( {
      status: true,
      message: "Review Added Successfully",
    });
  }
  catch (error) {
    throw new Error(error);
  }
});

//get All
const getAllReviews = asyncHandler(async (req, res) => {
  try {
    const review = await Review.find().populate("user");
    res
    .status(200)
    .json( {
      status: true,
      message: "Review Fetched Successfully",
      review
    });
  }
  catch (error) {
    throw new Error(error);
  }
});

//get a
const getAReview = asyncHandler(async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const review = await Review.findById(id).populate("user");
    res.status(200).json( {
      status: true,
      message: "Review Fetched Successfully",
      review
    });
  }
  catch (error) {
    throw new Error(error);
  }
});

//delete
const deleteAReview = asyncHandler(async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const review = await Review.findByIdAndDelete(id);
    res.status(200).json( {
      status: true,
      message: "Review Delete Successfully",
    });
  }
  catch (error) {
    throw new Error(error);
  }
});

//update
const updateReviewStatus = asyncHandler(async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const review = await Review.findByIdAndUpdate(
      id,
      {
        isApproved: req.body.isApproved
      },
      {
        new: true
      }
    );
    res.status(200).json( {
      status: true,
      message: "Review Updated Successfully",
      review
    });
  }
  catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createReview,
  getAllReviews,
  getAReview,
  deleteAReview,
  updateReviewStatus
};