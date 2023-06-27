const {
  postBlogCategory,
  getAllBlogCat,
  getABlogCat,
  updateABlogCat,
  deleteABlogCat
} = require("../controllers/blogCatCtrl");
const {
  isAdmin,
  authMiddleware
} = require("../middlewares/authMiddleware");

const blogCatRouter = require("express").Router();

blogCatRouter.post("/", authMiddleware, isAdmin, postBlogCategory);
blogCatRouter.get("/all", getAllBlogCat);
blogCatRouter.get("/:slug", authMiddleware, isAdmin, getABlogCat);
blogCatRouter.put("/:id", authMiddleware, isAdmin, updateABlogCat);
blogCatRouter.delete("/:id", authMiddleware, isAdmin, deleteABlogCat);

module.exports = blogCatRouter;