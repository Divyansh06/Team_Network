const Mongodb = require("mongodb");
const { getDB } = require("../Utils/database");
const Post = require("./PostModal");

class Comment {
  constructor(creator, postId, message, likes, created_at, id) {
    this._id = id || Mongodb.ObjectID();
    this.postId = postId;
    this.creator = creator;
    this.message = message;
    this.likes = likes || 0;
    this.created_at = created_at || new Date().getTime();
  }

  async save() {
    const db = getDB();
    const query = { _id: Mongodb.ObjectID(this.postId) };
    const projection = { _id: 0, comments: 1 };
    const postcomments = await db
      .collection("Post")
      .find(query)
      .project(projection)
      .toArray()
      .catch((err) => {
        throw err;
      });
    if (postcomments) {
      var { comments } = postcomments[0];
      comments.unshift(this._id);
      const query = { _id: Mongodb.ObjectID(this.postId) };
      const update = {
        $set: {
          comments,
        },
      };
      const postresult = db
        .collection("Post")
        .updateOne(query, update)
        .catch((err) => {
          throw err;
        });
    }
    const commentresult = await db
      .collection("Comment")
      .insertOne(this)
      .catch((err) => {
        throw err;
      });
    return this;
  }

  static async deleteComment(commentId, postId) {
    const db = getDB();
    let postresult;
    const postquery = { _id: Mongodb.ObjectID(postId) };
    const projection = { _id: 0, comments: 1 };
    var post_comments = await db
      .collection("Post")
      .find(postquery)
      .project(projection)
      .toArray()
      .catch((err) => {
        throw err;
      });

    if (post_comments.length > 0) {
      post_comments = post_comments[0].comments;
      const commentindex = post_comments.find(
        (item) => item.toString() === commentId
      );
      post_comments.splice(commentindex, 1);
      const postupdate = {
        $set: {
          comments: post_comments,
        },
      };
      postresult = await db
        .collection("Post")
        .updateOne(postquery, postupdate)
        .catch((err) => {
          throw err;
        });
    }
    const query = { _id: Mongodb.ObjectID(commentId) };
    const result = await db
      .collection("Comment")
      .deleteOne(query)
      .catch((err) => {
        throw err;
      });
    return {
      postresult,
      result,
    };
  }

  static async likeComment(commentId) {
    const db = getDB();
    let result;
    const query = { _id: Mongodb.ObjectID(commentId) };
    const comment = await db
      .collection("Comment")
      .findOne(query)
      .catch((err) => {});

    if (comment) {
      const comment_likes = comment.likes;
      const update = {
        $set: {
          likes: comment_likes + 1,
        },
      };
      result = await db
        .collection("Comment")
        .updateOne(query, update)
        .catch((err) => {
          throw err;
        });
      return result;
    } else throw new Error("No comment found with this id!");
    return result;
  }
}

module.exports = Comment;
