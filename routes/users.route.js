const pool = require("../db/index");
const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM users;");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

module.exports = router;
