const Comment = require("../Modals/CommentModal");
const Post = require("../Modals/PostModal");
const { ObjectID } = require("mongodb");
const { getDB } = require("../Utils/database");

module.exports.getAllPost = async (req, res, next) => {
  const Posts = await Post.getAllPost();
  res.status(200).json(Posts);
};

module.exports.getPost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.getPostById(postId);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

module.exports.createPost = async (req, res, next) => {
  const { caption, description, creator, wall } = req.body;
  try {
    const post = new Post(creator, wall, caption, description);
    const result = await post.save();
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports.editPost = async (req, res, next) => {
  const {
    id,
    creator,
    caption,
    description,
    likes,
    comments,
    created_at,
  } = req.body;

  const post = new Post(
    creator,
    caption,
    description,
    likes,
    comments,
    created_at,
    id
  );

  try {
    const result = await post.edit();
    res.status(201).json({
      message: "Post successfully updated!",
      result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deletePost = async (req, res, next) => {
  const { postId } = req.body;
  try {
    const post = await Post.deletePost(postId);
    res.status(201).json({
      message: "Post Deleted Successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports.likePost = async (req, res, next) => {
  const { postId } = req.body;
  const db = getDB();
  try {
    const query = { _id: ObjectID(postId) };
    const post = await db.collection("Post").findOne(query);
    if (post) {
      const likes_count = post.likes;
      const query = {
        _id: ObjectID(postId),
      };
      const update = {
        $set: {
          likes: likes_count + 1,
        },
      };
      const updateresult = await db.collection("Post").updateOne(query, update);
      res.status(201).json({
        message: "Post Like Success!",
      });
    } else {
      throw new Error("No post exist with this Id!");
    }
  } catch (err) {
    next(err);
  }
};

module.exports.commentPost = async (req, res, next) => {
  const { postId, message, creator } = req.body;
  try {
    const comment = new Comment(creator, postId, message);
    const result = await comment.save();
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports.likeComment = async (req, res, next) => {
  const { commentId } = req.body;
  try {
    const comment = await Comment.likeComment(commentId);
    res.status(201).json({ message: "Comment liked Successfully!" });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteComment = async (req, res, next) => {
  const { postId, commentId } = req.body;
  try {
    const result = await Comment.deleteComment(commentId, postId);
    res.status(201).json({
      message: "Comment Deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};
