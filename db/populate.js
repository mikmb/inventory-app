const pool = require("./pool");

async function populate() {
  await pool.query("DELETE FROM items");
  await pool.query("DELETE FROM categories");

  await pool.query(`INSERT INTO categories (name) VALUES ($1), ($2), ($3)`, [
    "Electronics",
    "Furniture",
    "Bicycles",
  ]);

  await pool.query(`INSERT INTO items (name, description, quantity, category_id)
    VALUES 
    ('Monitor', '24-inch 1080p display', 10, 1),
    ('Chair', 'Ergonomic office chair', 5, 2),
    ('Balance Bike', 'Toddler balance bike', 3, 3)`);

  console.log("Database populated.");
  process.exit();
}

populate().catch((err) => {
  console.error(err);
  process.exit(1);
});
