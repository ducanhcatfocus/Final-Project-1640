import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment_content: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {type: Date, default: Date.now}
   
})

module.exports = mongoose.model('comment', CommentSchema);