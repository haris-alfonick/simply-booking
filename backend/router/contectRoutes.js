const express = require("express");
const { createContact, getAllContacts, getContactById, updateContact, deleteContact } = require("../controllers/contactController");
const { verifyToken, isAdmin } = require("../middleware/VerifyToken");
const router = express.Router();
router.use(verifyToken)
router.post("/", createContact);
router.get("/", getAllContacts);
router.get("/:id", isAdmin, getContactById);
router.put("/:id", isAdmin, updateContact);
router.delete("/:id", isAdmin, deleteContact);

module.exports = router;
