const router = require("express").Router();
// const auth = require("../../middleware/auth");
// const authAdmin = require("../../middleware/authAdmin");
const staffController = require("../controllers/staffController");
const upload = require("../config/multer");

router.route("/home").get(staffController.home);
router.route("/").get(staffController.home);
router.route("/campaigns").get(staffController.getCampaign);

///campaigns/category/<%=category._id%>
router
  .route("/campaign/category/:id")
  .get(staffController.getCampaignByCategory);

router.route("/campaign_detail/:id").get(staffController.getCampaignDetail);
router.route("/submit_idea/:id").get(staffController.getCreateIdea);

router
  .route("/submit_idea/upload")
  .post(upload.upload, staffController.createIdea);

router.route("/idea_detail/:id").get(staffController.getIdeaDetail);
router.route("/comment/:id").post(staffController.comment);
router.route("/like/:id").post(staffController.like);
router.route("/unlike/:id").get(staffController.unlike);
router.route("/dislike/:id").post(staffController.dislike);
router.route("/unDislike/:id").get(staffController.unDislike);

module.exports = router;
