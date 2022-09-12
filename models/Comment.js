const mongoose = require("mongoose");
const {contentSchema, emailSchema} = require('../utils/schemaValidation')
const { Schema } = mongoose;

const commentSchema = new Schema({

})



const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment;