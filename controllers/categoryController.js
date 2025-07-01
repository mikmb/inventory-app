const db = require("../db/queries");

// GET /categories
const list = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("categories/list", { categories });
};

// GET /categories/new
const newForm = (req, res) => {
  res.render("categories/form", { category: null });
};

// POST /categories
const create = async (req, res) => {
  const { name } = req.body;
  await db.createCategory(name);
  res.redirect("/categories");
};

// GET /categories/:id
const detail = async (req, res) => {
  const category = await db.getCategoryById(req.params.id);
  if (!category) {
    return res.status(404).send("Category not found");
  }
  res.render("categories/detail", { category });
};

// GET /categories/:id/edit
const editForm = async (req, res) => {
  const category = await db.getCategoryById(req.params.id);
  if (!category) {
    return res.status(404).send("Category not found");
  }
  res.render("categories/form", { category });
};

// POST /categories/:id/edit
const update = async (req, res) => {
  const { name } = req.body;
  await db.updateCategory(req.params.id, name);
  res.redirect("/categories/" + req.params.id);
};

// POST /categories/:id/delete
const deleteCategory = async (req, res) => {
  await db.deleteCategory(req.params.id);
  res.redirect("/categories");
};

module.exports = {
  list,
  newForm,
  create,
  detail,
  editForm,
  update,
  delete: deleteCategory,
};
