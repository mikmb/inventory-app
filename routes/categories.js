const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.list);
router.get("/new", categoryController.newForm);
router.post("/", categoryController.create);
router.get("/:id", categoryController.detail);
router.get("/:id/edit", categoryController.editForm);
router.post("/:id/edit", categoryController.update);
router.post("/:id/delete", categoryController.delete);

module.exports = router;
