const express = require("express");
const app = express();
require("dotenv").config();

const path = require("path");

const PORT = process.env.PORT || 3000;

const itemRoutes = require("./routes/items");
const categoryRoutes = require("./routes/categories");

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to parse form data
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// Mount routes
app.use("/items", itemRoutes);
app.use("/categories", categoryRoutes);

// Routes
app.get("/", (req, res) => res.redirect("/items"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
