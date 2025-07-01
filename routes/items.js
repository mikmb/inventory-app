const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

// List all items (with optional search)
router.get("/", itemController.list);

// Show form to create a new item
router.get("/new", itemController.newForm);

// Handle form submission to create a new item
router.post("/", itemController.create);

// Show a specific item's details
router.get("/:id", itemController.detail);

// Show form to edit an existing item
router.get("/:id/edit", itemController.editForm);

// Handle form submission to update the item
router.post("/:id/edit", itemController.update);

// Handle deleting an item
router.post("/:id/delete", itemController.deleteItem);

module.exports = router;
