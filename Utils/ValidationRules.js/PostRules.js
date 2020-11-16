const { body } = require("express-validator");

module.exports.createPostRules = [
  body("caption")
    .trim()
    .notEmpty()
    .withMessage("Caption is Required!")
    .isString()
    .withMessage("Invalid Caption"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is Required!")
    .isString()
    .withMessage("Invalid Description"),

  body("creator")
    .trim()
    .notEmpty()
    .withMessage("Creator is Required!")
    .isMongoId()
    .withMessage("Invalid Creator Id"),

  body("wall")
    .trim()
    .notEmpty()
    .withMessage("Wall is Required!")
    .isMongoId()
    .withMessage("Invalid Wall Id"),
];

module.exports.editPostRules = [
  body("postId")
    .trim()
    .notEmpty()
    .withMessage("PostId is Required!")
    .isMongoId()
    .withMessage("Invalid Id"),
  body("caption")
    .trim()
    .notEmpty()
    .withMessage("Caption is Required!")
    .isString()
    .withMessage("Invalid Caption"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is Required!")
    .isString()
    .withMessage("Invalid Description"),
  body("creator")
    .trim()
    .notEmpty()
    .withMessage("Creator is Required!")
    .isMongoId()
    .withMessage("Invalid Creator Id"),
  body("likes")
    .trim()
    .notEmpty()
    .withMessage("Likes is Required!")
    .isNumeric()
    .withMessage("Invalid Likes Value."),
  body("comments")
    .trim()
    .notEmpty()
    .withMessage("Comments are Required!")
    .isArray()
    .withMessage("Invalid Comments Value."),
  body("created_at")
    .trim()
    .notEmpty()
    .withMessage("Creation time is Required!")
    .isDate()
    .withMessage("Invalid Date!"),
];

module.exports.deletePostRules = [
  body("postId")
    .trim()
    .notEmpty()
    .withMessage("Post Id is Required!")
    .isMongoId()
    .withMessage("Invalid Creator Id"),
];

module.exports.likePostRules = [
  body("postId")
    .trim()
    .notEmpty()
    .withMessage("Post Id is Required!")
    .isMongoId()
    .withMessage("Invalid Post Id"),
];

module.exports.commentPostRules = [
  body("postId")
    .trim()
    .notEmpty()
    .withMessage("Post Id is Required!")
    .isMongoId()
    .withMessage("Invalid Post Id"),
  body("creator")
    .trim()
    .notEmpty()
    .withMessage("Creator is Required!")
    .isMongoId()
    .withMessage("Invalid Creator"),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is Required!")
    .isString()
    .withMessage("Invalid Message"),
];

module.exports.likeCommentRules = [
  body("commentId")
    .trim()
    .notEmpty()
    .withMessage("Comment Id is Required!")
    .isMongoId()
    .withMessage("Invalid Comment Id"),
];

module.exports.deleteCommentRules = [
  body("commentId")
    .trim()
    .notEmpty()
    .withMessage("Comment Id is Required!")
    .isMongoId()
    .withMessage("Invalid Comment Id"),
  body("postId")
    .trim()
    .notEmpty()
    .withMessage("Post Id is Required!")
    .isMongoId()
    .withMessage("Invalid Post Id"),
];
