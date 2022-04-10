const router = require("express").Router();
const campaignController = require("../controllers/campaignController");
router.route("/").get(campaignController.getCampaign);

module.exports = router;
