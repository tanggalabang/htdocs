const validateMongodbId = require("../config/validateMongoDbId");
const {
  default: slugify
  } = require("slugify");
  const VideoCat = require("../models/videoCatModel");
  const asyncHandler = require("express-async-handler");

  // create
  const postVideoCategory = asyncHandler(async (req, res) => {
    try {
    if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      const postVideoCat = await VideoCat.create(req.body);
      res.status(200).json( {
        status: true,
        message: "Video Category Created Succesfully",
        postVideoCat
      })
    }
    catch (error) {
      throw new Error(error);
    }
  });

  // get all
  const getAllVideoCat = asyncHandler(async (req, res) => {
    try {
      const allVideocat = await VideoCat.find();
      res
      .status(200)
      .json( {
        status: true,
        message: "Videos Category Fetched Successfully",
        allVideocat,
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  // get a
  const getAVideoCat = asyncHandler(async (req, res) => {
    const {
      slug
    } = req.params;
    try {
      const findVideoCat = await VideoCat.findOne({slug:slug});
      res.status(200).json( {
        status: true,
        message: "Category Found!",
        findVideoCat,
      })
    }
    catch (error) {
      throw new Error(error);
    }
  });

  // delete
  const deleteAVideoCat = asyncHandler(async (req, res) => {
    const {
      id
    } = req.params;
    validateMongodbId(id);
    try {
      const deleteAVideoCat = await VideoCat.findByIdAndDelete(id);
      res.status(200).json( {
        status: true,
        message: "Category deleted Successfully",
      })
    } catch (error) {
      throw new Error(error);
    }
  });

  // update
  const updateAVideoCat = asyncHandler(async (req, res) => {
    const {
      id
    } = req.params;
    validateMongodbId(id);
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      const updateVideoCat = await VideoCat.findByIdAndUpdate(id, req.body, {
        new: true
      });
      res.status(200).json( {
        status: true,
        message: "Category Updated!",
        updateVideoCat,
      })
    }
    catch (error) {
      throw new Error(error);
    }
  });

  module.exports = {
    postVideoCategory,
    getAllVideoCat,
    getAVideoCat,
    deleteAVideoCat,
    updateAVideoCat
  };