const express = require("express");
const morgan = require("morgan");
const mainRoutes = require("./routes/index");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", mainRoutes);

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
