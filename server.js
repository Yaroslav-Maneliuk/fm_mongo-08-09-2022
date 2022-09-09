const http = require("http");
const express = require("express");
const yup = require("yup");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /[a-z0-9\s\.,!?]{5,256}/i.test(v),
      message: (props) => `${props.value} is not valid content!`,
    },
  },
  author: {
    login: String,
    rate: Number,
  },
  isCorrect: { type: Boolean, default: false },
  publishAt: { type: Date, default: Date.now },
});
const Post = mongoose.model("Post", postSchema);

mongoose
  .connect("mongodb://localhost:27017/fm_mongo-08-09-2022")
  .catch((err) => console.log(err.message));

const app = express();
app.use(express.json());
app.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const newPost = await Post.create(body);
    res.send(newPost);
  } catch (error) {
    next(error);
  }
});
app.get("/", async (req, res, next) => {});

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("server started at port = " + PORT);
});
