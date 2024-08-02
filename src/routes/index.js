const express = require("express");
const router = express.Router();

// Import swagger

const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("../../docs/swagger/index.json");

// Import routes
const V1_ROUTES = require("./v1/");

router.use("/v1", V1_ROUTES);

router.use("/docs", swaggerUI.serve);
router.get("/docs", swaggerUI.setup(swaggerDoc));

module.exports = router;
