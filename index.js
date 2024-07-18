const express = require("express");
const pool = require("./db");
const usersRoutes = require("./routes/users.route");

require("dotenv").config();

// Mendefinisikan aplikasi express
const app = express();

// Mendefinisikan middleware
app.use(express.json());
app.use("/users", usersRoutes);

// Definisi Port dan menjalankan server
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
