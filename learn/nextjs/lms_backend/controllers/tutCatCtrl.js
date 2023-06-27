const validateMongodbId = require("../config/validateMongoDbId");
const {
  default: slugify
  } = require("slugify");
  const TutorialCategory = require("../models/tutCategory");
  const asyncHandler = require("express-async-handler");

  // create
  const postTutorialCategory = asyncHandler(async (req, res) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      const postTutCat = await TutorialCategory.create(req.body);
      res.status(200).json( {
        status: true,
        message: "Tutorial Category Created Succesfully",
      })
    }
    catch (error) {
      throw new Error(error);
    }
  });

  // get all
  const getAllTutCategories = asyncHandler(async (req, res) => {
    try {
      const alltutcat = await TutorialCategory.find();
      res
      .status(200)
      .json( {
        status: true,
        message: "Tutorials Category Fetched Successfully",
        alltutcat,
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  // get a
  const getATutCat = asyncHandler(async (req, res) => {
    const {
      id
    } = req.params;
    validateMongodbId(id);
    try {
      const findTutCat = await TutorialCategory.findById(id);
      res.status(200).json( {
        status: true,
        message: "Category Found!",
        findTutCat,
      })
    }
    catch (error) {
      throw new Error(error);
    }
  });

  // delete
  const deleteATutCat = asyncHandler(async (req, res) => {
    const {
      id
    } = req.params;
    validateMongodbId(id);
    try {
      const deleteATutCat = await TutorialCategory.findByIdAndDelete(id);
      res.status(200).json( {
        status: true,
        message: "Category deleted Successfully",
      })
    } catch (error) {
      throw new Error(error);
    }
  });

  // update
  const updateATutCat = asyncHandler(async (req, res) => {
    const {
      id
    } = req.params;
    validateMongodbId(id);
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      const updateTutCat = await TutorialCategory.findByIdAndUpdate(id, req.body, {
        new: true
      });
      res.status(200).json( {
        status: true,
        message: "Category Updated!",
        updateTutCat,
      })
    }
    catch (error) {
      throw new Error(error);
    }
  });

  module.exports = {
    postTutorialCategory, getAllTutCategories, getATutCat, deleteATutCat, updateATutCat
  };