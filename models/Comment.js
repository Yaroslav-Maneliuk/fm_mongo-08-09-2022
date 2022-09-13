const mongoose = require("mongoose");
const { contentSchema, emailSchema } = require("../utils/schemaValidation");
const { Schema } = mongoose;

const commentSchema = new Schema({
  comment: {
    type: Text,
    validate: {
      validator: (v) => contentSchema.isValid(v),
      message: (props) => `${props.value} is not a valid comment!`,
    },
  },
  author: { type: String, default: "Anonim" },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
