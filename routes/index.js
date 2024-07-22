const express = require("express");
const router = express.Router();

//

// Import routes
const V1_ROUTES = require("./v1/");

router.use("/v1", V1_ROUTES);

module.exports = router;
