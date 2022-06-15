const Router = require("express");
const router = new Router();
const userController = require("./controllers/userControllers");
const authMiddleware = require("./middleware/authMiddleware");

router.post("/connect", userController.register);
router.post("/auth", userController.login);
router.post("/upd-pass", userController.updatePassword);
router.get("/auth-check", authMiddleware, userController.check);

module.exports = router;
