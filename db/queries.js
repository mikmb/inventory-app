const pool = require("./pool");

// Categories
const getAllCategories = async () => {
  const result = await pool.query("SELECT * FROM categories ORDER BY name");
  return result.rows;
};

const getCategoryById = async (id) => {
  const result = await pool.query("SELECT * FROM categories WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

const createCategory = async (name) => {
  await pool.query("INSERT INTO categories (name) VALUES ($1)", [name]);
};

const updateCategory = async (id, name) => {
  await pool.query("UPDATE categories SET name = $1 WHERE id = $2", [name, id]);
};

const deleteCategory = async (id) => {
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
};

// Items
const getAllItems = async () => {
  const result = await pool.query(`
    SELECT items.*, categories.name AS category_name
    FROM items LEFT JOIN categories ON items.category_id = categories.id
    ORDER BY items.name
  `);
  return result.rows;
};

const getItemById = async (id) => {
  const result = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
  return result.rows[0];
};

const createItem = async ({ name, description, quantity, category_id }) => {
  await pool.query(
    `INSERT INTO items (name, description, quantity, category_id)
     VALUES ($1, $2, $3, $4)`,
    [name, description, quantity, category_id || null]
  );
};

const updateItem = async (id, { name, description, quantity, category_id }) => {
  await pool.query(
    `UPDATE items 
     SET name = $1, description = $2, quantity = $3, category_id = $4
     WHERE id = $5`,
    [name, description, quantity, category_id || null, id]
  );
};

const deleteItem = async (id) => {
  await pool.query("DELETE FROM items WHERE id = $1", [id]);
};

// 🔍 Search (optional)
const searchItems = async (term) => {
  const result = await pool.query(
    `
    SELECT * FROM items
    WHERE name ILIKE $1 OR description ILIKE $1
  `,
    [`%${term}%`]
  );
  return result.rows;
};

module.exports = {
  // Categories
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  // Items
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  // Search
  searchItems,
};
