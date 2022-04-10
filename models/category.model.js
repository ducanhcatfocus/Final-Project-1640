const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  campaign: [
    {
      campaign_id: {
        type: Schema.Types.ObjectId,
        ref: "campaign",
      },
    },
  ],
  number_campaign: { type: Number, default: 0 },
});

module.exports = mongoose.model("category", CategorySchema);
