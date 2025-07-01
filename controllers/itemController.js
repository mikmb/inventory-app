// controllers/itemController.js
const db = require("../db/queries");

// GET /items
const list = async function (req, res) {
  const searchTerm = req.query.search || "";
  const items = searchTerm
    ? await db.searchItems(searchTerm)
    : await db.getAllItems();

  res.render("items/list", { items, searchTerm });
};

// GET /items/new
const newForm = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("items/form", { item: null, categories });
};

// GET /items/:id
const detail = async (req, res) => {
  const item = await db.getItemById(req.params.id);
  res.render("items/detail", { item });
};

// POST /items
const create = async (req, res) => {
  await db.createItem(req.body);
  res.redirect("/items");
};

// GET /items/:id/edit
const editForm = async (req, res) => {
  const item = await db.getItemById(req.params.id);
  if (!item) {
    return res.status(404).send("Item not found.");
  }

  const categories = await db.getAllCategories();
  res.render("items/form", { item, categories, isEdit: true });
};
// POST /items/:id/edit
const update = async (req, res) => {
  await db.updateItem(req.params.id, req.body);
  res.redirect(`/items/${req.params.id}`);
};
// POST /items/:id/delete
const deleteItem = async (req, res) => {
  await db.deleteItem(req.params.id);
  res.redirect("/items");
};

module.exports = {
  list,
  detail,
  newForm,
  create,
  editForm,
  update,
  deleteItem,
};
