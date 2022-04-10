const router = require("express").Router();
// const auth = require("../../middleware/auth");

const adminController = require("../controllers/adminController");

router.route("/").get(adminController.viewAllAccounts);

router.route("/accounts").get(adminController.viewAllAccounts);
router.route("/maintain").get(adminController.getMaintain);
router.route("/backup").get(adminController.getBackup);

router
  .route("/create_account")
  .get(adminController.getCreateAccount)
  .post(adminController.createAccount);

router
  .route("/edit_account/:id")
  .get(adminController.getAccountById)
  .post(adminController.updateAccount);

router.route("/delete_account/:id").get(adminController.deleteAccount);

router
  .route("/create_department")
  .get(adminController.viewAllDepartments)
  .post(adminController.createDepartment);

router.route("/campaigns").get(adminController.viewAllCampaigns);
router
  .route("/create_campaign")
  .get(adminController.getCreateCampaign)
  .post(adminController.createCampaign);
router.route("/delete_campaign/:id").get(adminController.deleteCampaign);
router
  .route("/campaign/:id")
  .post(adminController.updateCampaign)
  .get(adminController.getCampaignById);

module.exports = router;
