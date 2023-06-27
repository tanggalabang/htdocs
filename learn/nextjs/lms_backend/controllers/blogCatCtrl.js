const validateMongodbId = require("../config/validateMongoDbId");
const {
  default: slugify
  } = require("slugify");
  const BlogCat = require("../models/blogCatModel");
  const asyncHandler = require("express-async-handler");

  // create
  const postBlogCategory = asyncHandler(async (req, res) => {
    try {
    if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      const postBlogCat = await BlogCat.create(req.body);
      res.status(200).json( {
        status: true,
        message: "Blog Category Created Succesfully",
        postBlogCat
      })
    }
    catch (error) {
      throw new Error(error);
    }
  });

  // get all
  const getAllBlogCat = asyncHandler(async (req, res) => {
    try {
      const allBlogcat = await BlogCat.find();
      res
      .status(200)
      .json( {
        status: true,
        message: "Blogs Category Fetched Successfully",
        allBlogcat,
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  // get a
  const getABlogCat = asyncHandler(async (req, res) => {
    const {
      slug
    } = req.params;
    try {
      const findBlogCat = await BlogCat.findOne({slug:slug});
      res.status(200).json( {
        status: true,
        message: "Category Found!",
        findBlogCat,
      })
    }
    catch (error) {
      throw new Error(error);
    }
  });

  // delete
  const deleteABlogCat = asyncHandler(async (req, res) => {
    const {
      id
    } = req.params;
    validateMongodbId(id);
    try {
      const deleteABlogCat = await BlogCat.findByIdAndDelete(id);
      res.status(200).json( {
        status: true,
        message: "Category deleted Successfully",
      })
    } catch (error) {
      throw new Error(error);
    }
  });

  // update
  const updateABlogCat = asyncHandler(async (req, res) => {
    const {
      id
    } = req.params;
    validateMongodbId(id);
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      const updateBlogCat = await BlogCat.findByIdAndUpdate(id, req.body, {
        new: true
      });
      res.status(200).json( {
        status: true,
        message: "Category Updated!",
        updateBlogCat,
      })
    }
    catch (error) {
      throw new Error(error);
    }
  });

  module.exports = {
    postBlogCategory,
    getAllBlogCat,
    getABlogCat,
    deleteABlogCat,
    updateABlogCat
  };