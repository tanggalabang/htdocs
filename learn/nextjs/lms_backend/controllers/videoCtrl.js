const Video = require("../models/videoModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../config/validateMongoDbId");
const {
  default: slugify
  } = require("slugify");

  // create or post video
  const postvideo = asyncHandler(async (req, res) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      const video = await Video.create(req.body);
      res
      .status(200)
      .json( {
        status: true,
        message: "Video Posted Successfully!"
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  // get A video
  const getVideo = asyncHandler(async (req, res) => {
    const {
      slug
    } = req.params;
    try {
      const video = await Video.findOne( {
        slug: slug
      });
      res
      .status(200)
      .json( {
        status: true,
        message: "Video Found!",
        video
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  // get All videos
  const getallvideos = asyncHandler(async (req, res) => {
    try {
      const video = await Video.find();
      res
      .status(200)
      .json( {
        status: true,
        message: "Videos Found!",
        video
      });
    }
    catch (error) {
      throw new Error(error);
    }
  });

  //delete
  const deleteVideo = asyncHandler(async (req, res) => {
    const {
      id
    } = req.params;
    validateMongodbId(id);
    try {
      const video = await Video.findByIdAndDelete(
        id
      );
      res
      .status(200)
      .json( {
        status: true,
        message: "Video Deleted!"
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  //update
  const updatevideo = asyncHandler(async (req, res) => {
    const {
      id
    } = req.params;
    validateMongodbId(id);
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      const video = await Video.findByIdAndUpdate(id, req.body, {
        new: true
      });
      res
      .status(200)
      .json( {
        status: true,
        message: "Video Updated Successfully!",
        video
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  module.exports = {
    postvideo,
    getVideo,
    getallvideos,
    deleteVideo,
    updatevideo
  };