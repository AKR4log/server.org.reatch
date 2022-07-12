const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const dianaRouter = require("./dianaRouter");

router.use("/u", userRouter);
router.use("/diana", dianaRouter);

module.exports = router;
