const pool = require("./pool");

async function createTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        quantity INTEGER DEFAULT 0,
        category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL
      )
    `);

    console.log("Tables created successfully.");
    process.exit();
  } catch (err) {
    console.error("Error creating tables:", err);
    process.exit(1);
  }
}

createTables();
