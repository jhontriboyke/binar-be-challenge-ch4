const express = require("express");
const morgan = require("morgan");

require("dotenv").config();

// Mendefinisikan aplikasi express
const app = express();

// Mendefinisikan middleware
app.use(express.json());
app.use(morgan("dev"));

// Import main routes
const mainRoutes = require("./routes/index");

app.use("/api/v1", mainRoutes);

// Definisi Port dan menjalankan server
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
