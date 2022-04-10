const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/", userController.getLogin);
router.post("/", userController.login);
router.get("/logout", userController.logout);

module.exports = router;
