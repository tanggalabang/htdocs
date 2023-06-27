const {
  postTutorial,
  getATutorial,
  updateTutorial,
  allTutorial,
  deleteTutorial
} = require("../controllers/tutorialCtrl");
const
{
  authMiddleware,
  isAdmin
} = require("../middlewares/authMiddleware");

const tutorialRouter = require("express").Router();

tutorialRouter.post("/", authMiddleware, isAdmin, postTutorial);
tutorialRouter.get("/:type/:slug", getATutorial);
tutorialRouter.get("/", authMiddleware, isAdmin, allTutorial);
tutorialRouter.put("/:id", authMiddleware, isAdmin, updateTutorial);
tutorialRouter.delete("/:id", authMiddleware, isAdmin, deleteTutorial);

module.exports = tutorialRouter;