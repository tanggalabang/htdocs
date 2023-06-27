const {
  postblog,
  getBlog,
  getallblogs,
  deleteBlog,
  updateblog,
} = require("../controllers/blogCtrl");

const blogRouter = require("express").Router();
const {
  authMiddleware,
  isAdmin
} = require("../middlewares/authMiddleware");

blogRouter.post("/", authMiddleware, isAdmin, postblog);
blogRouter.get("/:slug", getBlog);
blogRouter.get("/", getallblogs);
blogRouter.delete("/:id", deleteBlog);
blogRouter.put("/:id", authMiddleware, isAdmin, updateblog);

module.exports = blogRouter;