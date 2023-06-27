const validateMongodbId = require("../config/validateMongoDbId");
const {
  default: slugify
  } = require("slugify");
  const Tutorial = require("../models/tutorialModel");
  const asyncHandler = require("express-async-handler");

  // create
  const postTutorial = asyncHandler(async (req, res) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      if (req.body.tutorialCategory) {
        req.body.tutorialCategorySlug = slugify(
          req.body.tutorialCategory.toLowerCase()
        );
      }
      const postTut = await Tutorial.create(req.body);
      res
      .status(200)
      .json( {
        status: true, message: "Tutorial Created Successfully!"
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  // get a
  const getATutorial = asyncHandler(async (req, res) => {
    const {
      slug,
      type
    } = req.params;
    try {
      const getATutData = await Tutorial.findOne( {
        slug: slug,
        tutorialCategorySlug: type,
      });
      const tutorialTopics = await Tutorial.find({
        tutorialCategorySlug: type
      })
      .select("topicName title slug tutorialCategorySlug")
      .sort("createdAt");
      res
      .status(200)
      .json( {
        status: true,
        message: "Data Fetched!",
        getATutData,
        tutorialTopics,
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  //update
  const updateTutorial = asyncHandler(async (req, res) => {
    const {
      id
    } = req.params;
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      if (req.body.tutorialCategory) {
        req.body.tutorialCategorySlug = slugify(
          req.body.tutorialCategory.toLowerCase()
        );
      }
      const udpateTut = await Tutorial.findByIdAndUpdate(id, req.body, {
        new: true
      });
      res
      .status(200)
      .json( {
        status: true, message: "Tutorial Updated Successfully!"
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  //get all
  const deleteTutorial = asyncHandler(async (req, res) => {
    const {
      id
    } = req.params;
    try {
      const deleteTut = await Tutorial.findByIdAndDelete(id); res.status(200).json( {
        status: true, message: "Tutorial Deleted!"
      });
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const allTutorial = asyncHandler(async (req, res) => {
    try {
      const tuts = await Tutorial.find(); res.status(200).json( {
        status: true, message: "Tutorials Fetched", tuts
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  module.exports = {
    postTutorial,
    getATutorial,
    updateTutorial,
    allTutorial,
    deleteTutorial
  };