const Router = require("express");
const router = new Router();
const dianaControllers = require("./controllers/dianaControllers");

router.get("/surprise", dianaControllers.getSurprise);

module.exports = router;