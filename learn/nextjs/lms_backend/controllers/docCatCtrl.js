const validateMongodbId = require("../config/validateMongoDbId");
const {
  default: slugify
  } = require("slugify");
  const DocCat = require("../models/docCatModel");
  const asyncHandler = require("express-async-handler");

  // create
  const postDocCategory = asyncHandler(async (req, res) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      const postDocCat = await DocCat.create(req.body);
      res.status(200).json( {
        status: true,
        message: "Doc Category Created Succesfully",
        postDocCat
      })
    }
    catch (error) {
      throw new Error(error);
    }
  });

  // get all
  const getAllDocCat = asyncHandler(async (req, res) => {
    try {
      const allDoccat = await DocCat.find();
      res
      .status(200)
      .json( {
        status: true,
        message: "Docs Category Fetched Successfully",
        allDoccat,
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  // get a
  const getADocCat = asyncHandler(async (req, res) => {
    const {
      slug
    } = req.params;
    try {
      const findDocCat = await DocCat.findOne({slug:slug});
      res.status(200).json( {
        status: true,
        message: "Category Found!",
        findDocCat,
      })
    }
    catch (error) {
      throw new Error(error);
    }
  });

  // delete
  const deleteADocCat = asyncHandler(async (req, res) => {
    const {
      id
    } = req.params;
    validateMongodbId(id);
    try {
      const deleteADocCat = await DocCat.findByIdAndDelete(id);
      res.status(200).json( {
        status: true,
        message: "Category deleted Successfully",
      })
    } catch (error) {
      throw new Error(error);
    }
  });

  // update
  const updateADocCat = asyncHandler(async (req, res) => {
    const {
      id
    } = req.params;
    validateMongodbId(id);
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      const updateDocCat = await DocCat.findByIdAndUpdate(id, req.body, {
        new: true
      });
      res.status(200).json( {
        status: true,
        message: "Category Updated!",
        updateDocCat,
      })
    }
    catch (error) {
      throw new Error(error);
    }
  });

  module.exports = {
    postDocCategory,
    getAllDocCat,
    getADocCat,
    deleteADocCat,
    updateADocCat
  };