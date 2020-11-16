const express = require("express");
const Router = express.Router();
const postController = require("../Controllers/postController");
const Validate = require("../Utils/validations");
const {
  createPostRules,
  editPostRules,
  deletePostRules,
  likeCommentRules,
  likePostRules,
  commentPostRules,
  deleteCommentRules,
} = require("../Utils/ValidationRules.js/PostRules");

Router.get("/Posts", postController.getAllPost);

Router.get("/Posts/:postId", postController.getPost);

Router.post(
  "/createPost",
  createPostRules,
  Validate,
  postController.createPost
);

Router.post("/editPost", editPostRules, Validate, postController.editPost);

Router.post(
  "/deletePost",
  deletePostRules,
  Validate,
  postController.deletePost
);

Router.post("/likePost", likePostRules, Validate, postController.likePost);

Router.post(
  "/commentPost",
  commentPostRules,
  Validate,
  postController.commentPost
);

Router.post(
  "/likeComment",
  likeCommentRules,
  Validate,
  postController.likeComment
);

Router.post(
  "/deleteComment",
  deleteCommentRules,
  Validate,
  postController.deleteComment
);

module.exports = Router;
