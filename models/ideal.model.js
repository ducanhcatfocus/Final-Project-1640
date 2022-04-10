const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IdealSchema = new Schema({
  campaign_id: {
    type: Schema.Types.ObjectId,
    ref: "campaign",
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  upload_file: [
    {
      filename: String,
      mimetype: String,
      default_image: String,
    },
  ],
  viewBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  likeBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  dislikeBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: "user" },
      content: String,
      commentedAt: { type: Date, default: Date.now },
    },
  ],
  numberOfViews: { type: Number, default: 0 },
  numberOfLikes: { type: Number, default: 0 },
  numberOfDislikes: { type: Number, default: 0 },
  numberOfComments: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ideal", IdealSchema);
