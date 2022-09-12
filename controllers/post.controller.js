const Post = require("../models/Post");
const createError = require("http-errors");

module.exports.createPosts = async (req, res, next) => {
  try {
    const { body } = req;
    await Post.create(body, (err, post) => {
      if (err) {
        next(createError(400, "bad request"));
      }
      res.status(201).send(post);
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
};

module.exports.updatePost = async (req, res, next) => {
  try {
    const {
      body,
      params: { postId },
    } = req;
    const post = await Post.findByIdAndUpdate(postId, body, {new:true});
    // await Post.findByIdAndUpdate(postId, body, { new: true }, (err, post) => {
    //   if (err) {
    //     next(createError(400, "bad request"));
    //   }
    //   res.status(200).send(post);
    // });
    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
};

module.exports.deletePost = async (req, res, next) =>{
  try {
    const {
      params: { postId },
    } = req;
    const post = await Post.findByIdAndDelete(postId);
    if(!post){
      next(createError(400, "Post not found!"))
    }
    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
}
