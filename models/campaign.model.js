const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now },
  first_closure: { type: Date, default: null },
  final_closure: { type: Date, default: null },
});

module.exports = mongoose.model("campaign", CampaignSchema);
