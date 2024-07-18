const express = require("express");
const pool = require("./db");
require("dotenv").config();

// Mendefinisikan aplikasi express
const app = express();

// Mendefinisikan middleware
app.use(express.json());

// Get all kecamatan
app.get("/kecamatan", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM kecamatan");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Definisi Port dan menjalankan server
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
