const validateMongodbId = require("../config/validateMongoDbId");
const {
  default: slugify
  } = require("slugify");
  const CourseCat = require("../models/courseCategoryModel");
  const asyncHandler = require("express-async-handler");

  // create
  const postCourseCategory = asyncHandler(async (req, res) => {
    try {
    if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      const postCourseCat = await CourseCat.create(req.body);
      res.status(200).json( {
        status: true,
        message: "Course Category Created Succesfully",
        postCourseCat
      })
    }
    catch (error) {
      throw new Error(error);
    }
  });

  // get all
  const getAllCourseCat = asyncHandler(async (req, res) => {
    try {
      const allCoursecat = await CourseCat.find();
      res
      .status(200)
      .json( {
        status: true,
        message: "Courses Category Fetched Successfully",
        allCoursecat,
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  // get a
  const getACourseCat = asyncHandler(async (req, res) => {
    const {
      slug
    } = req.params;
    try {
      const findCourseCat = await CourseCat.findOne({slug:slug});
      res.status(200).json( {
        status: true,
        message: "Category Found!",
        findCourseCat,
      })
    }
    catch (error) {
      throw new Error(error);
    }
  });

  // delete
  const deleteACourseCat = asyncHandler(async (req, res) => {
    const {
      id
    } = req.params;
    validateMongodbId(id);
    try {
      const deleteACourseCat = await CourseCat.findByIdAndDelete(id);
      res.status(200).json( {
        status: true,
        message: "Category deleted Successfully",
      })
    } catch (error) {
      throw new Error(error);
    }
  });

  // update
  const updateACourseCat = asyncHandler(async (req, res) => {
    const {
      id
    } = req.params;
    validateMongodbId(id);
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      const updateCourseCat = await CourseCat.findByIdAndUpdate(id, req.body, {
        new: true
      });
      res.status(200).json( {
        status: true,
        message: "Category Updated!",
        updateCourseCat,
      })
    }
    catch (error) {
      throw new Error(error);
    }
  });

  module.exports = {
    postCourseCategory,
    getAllCourseCat,
    getACourseCat,
    deleteACourseCat,
    updateACourseCat
  };