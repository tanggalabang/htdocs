const {
  postCourseCategory,
  getAllCourseCat,
  getACourseCat,
  updateACourseCat,
  deleteACourseCat
} = require("../controllers/courseCatCtrl");
const {
  isAdmin,
  authMiddleware,
  isBoth
} = require("../middlewares/authMiddleware");

const courseCatRouter = require("express").Router();

courseCatRouter.post("/", authMiddleware, isBoth, postCourseCategory);
courseCatRouter.get("/all", getAllCourseCat);
courseCatRouter.get("/:slug", authMiddleware, isAdmin, getACourseCat);
courseCatRouter.put("/:id", authMiddleware, isAdmin, updateACourseCat);
courseCatRouter.delete("/:id", authMiddleware, isAdmin, deleteACourseCat);

module.exports = courseCatRouter;