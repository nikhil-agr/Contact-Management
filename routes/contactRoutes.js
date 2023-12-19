const express = require("express");
const { getContact, createContact, updateContact, deleteContact, getContacts } = require("../controllers/contactController");
const validateToken = require("../middlewares/validateTokenHandler");
const router = express.Router();

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
