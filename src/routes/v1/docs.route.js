const { Router } = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("../../../docs/swagger/index.json");

const router = Router();

router.use("/", swaggerUI.serve);
router.get("/", swaggerUI.setup(swaggerDoc));

module.exports = router;
