const {
  postDocCategory,
  getAllDocCat,
  getADocCat,
  updateADocCat,
  deleteADocCat
} = require("../controllers/docCatCtrl");
const {
  isAdmin,
  authMiddleware
} = require("../middlewares/authMiddleware");

const docCatRouter = require("express").Router();

docCatRouter.post("/", authMiddleware, isAdmin, postDocCategory);
docCatRouter.get("/all", getAllDocCat);
docCatRouter.get("/:slug", authMiddleware, isAdmin, getADocCat);
docCatRouter.put("/:id", authMiddleware, isAdmin, updateADocCat);
docCatRouter.delete("/:id", authMiddleware, isAdmin, deleteADocCat);

module.exports = docCatRouter;