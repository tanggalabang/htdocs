const {
  postvideo,
  getVideo,
  getallvideos,
  deleteVideo,
  updatevideo,
} = require("../controllers/videoCtrl");

const videoRouter = require("express").Router();
const {
  authMiddleware,
  isAdmin
} = require("../middlewares/authMiddleware");

videoRouter.post("/", authMiddleware, isAdmin, postvideo);
videoRouter.get("/:slug", getVideo);
videoRouter.get("/", getallvideos);
videoRouter.delete("/:id", deleteVideo);
videoRouter.put("/:id", authMiddleware, isAdmin, updatevideo);

module.exports = videoRouter;