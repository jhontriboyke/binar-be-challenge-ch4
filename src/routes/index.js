const express = require("express");
const router = express.Router();

// Import swagger
const path = require("path");
const yaml = require("yamljs");
const swaggerUI = require("swagger-ui-express");
const swaggerPath = path.join(__dirname, "../../docs/swagger/swagger-v2.yaml");
const swaggerDoc = yaml.load(swaggerPath);

// Import routes
const V1_ROUTES = require("./v1/");

router.use("/v1", V1_ROUTES);

router.use("/docs", swaggerUI.serve);
router.get("/docs", swaggerUI.setup(swaggerDoc));

module.exports = router;
