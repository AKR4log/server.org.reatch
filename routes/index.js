const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");

router.use("/u", userRouter);

module.exports = router;
