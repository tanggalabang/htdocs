const contactRouter = require("express").Router();
const {
  createcontact,
  getAllcontacts,
  getAcontact,
  deleteAcontact,
  updatecontactStatus
} = require("../controllers/contactCtrl");
const {
  authMiddleware,
  isAdmin
} = require("../middlewares/authMiddleware");

contactRouter.post("/", authMiddleware, createcontact);
contactRouter.get("/", getAllcontacts);
contactRouter.get("/:id", authMiddleware, isAdmin, getAcontact);
contactRouter.delete("/:id", authMiddleware, isAdmin, deleteAcontact);
contactRouter.put("/:id", authMiddleware, isAdmin, updatecontactStatus);

module.exports = contactRouter;