// index.js
require("dotenv").config(); // Loads .env variables
const express = require("express");
const path = require("path");

// Import routes
const pageRoutes = require("./routes/pages");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
// Set EJS as the view engine
app.set("view engine", "ejs");

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, client-side JS) from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// --- Routes ---
// Use the page-rendering routes
app.use("/", pageRoutes);

// Use the API data routes
app.use("/api", apiRoutes);

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
