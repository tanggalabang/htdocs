const {
  postVideoCategory,
  getAllVideoCat,
  getAVideoCat,
  updateAVideoCat,
  deleteAVideoCat
} = require("../controllers/videoCatCtrl");
const {
  isAdmin,
  authMiddleware
} = require("../middlewares/authMiddleware");

const videoCatRouter = require("express").Router();

videoCatRouter.post("/", authMiddleware, isAdmin, postVideoCategory);
videoCatRouter.get("/all", getAllVideoCat);
videoCatRouter.get("/:slug", authMiddleware, isAdmin, getAVideoCat);
videoCatRouter.put("/:id", authMiddleware, isAdmin, updateAVideoCat);
videoCatRouter.delete("/:id", authMiddleware, isAdmin, deleteAVideoCat);

module.exports = videoCatRouter;