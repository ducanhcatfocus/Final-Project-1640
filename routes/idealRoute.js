const router = require("express").Router();
const idealController = require("../controllers/idealController");

router.route("/:page").get(idealController.getList);

module.exports = router;
