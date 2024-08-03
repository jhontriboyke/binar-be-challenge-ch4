const app = require("./app");

const PORT = process.env.SERVER_PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
