const Campaign = require("../models/campaign.model");

const campaignController = {
  getCampaign: async (req, res) => {
    try {
      const campaigns = await Campaign.find();
      res.render("all-campaigns", { campaigns, title: "List of Campaigns" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = campaignController;
