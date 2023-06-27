const {
  postdoc,
  getdoc,
  getalldocs,
  deletedoc,
  updatedoc,
} = require("../controllers/docCtrl");

const docRouter = require("express").Router();
const {
  authMiddleware,
  isAdmin
} = require("../middlewares/authMiddleware");

docRouter.post("/", authMiddleware, isAdmin, postdoc);
docRouter.get("/:slug", getdoc);
docRouter.get("/", getalldocs);
docRouter.delete("/:id", deletedoc);
docRouter.put("/:id", authMiddleware, isAdmin, updatedoc);

module.exports = docRouter;