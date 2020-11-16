const Mongodb = require("mongodb");
const { getDB } = require("../Utils/database");

class Post {
  constructor(
    creator,
    wall,
    caption,
    description,
    likes,
    comments,
    created_at,
    id
  ) {
    this._id = id || new Mongodb.ObjectID();
    this.caption = caption;
    this.description = description;
    this.likes = likes || 0;
    this.comments = comments || [];
    this.creator = creator;
    this.wall = wall;
    this.created_at = created_at || new Date().getTime();
    this.updated_at = new Date().getTime();
  }

  async save() {
    const db = getDB();
    const creator_exist = await db
      .collection("User")
      .findOne({ _id: Mongodb.ObjectID(this.creator) });
    const wall_exist = await db
      .collection("Team")
      .findOne({ _id: Mongodb.ObjectID(this.wall) });
    if (wall_exist) {
      if (creator_exist && creator_exist.teams.includes(this.wall)) {
        const result = await db
          .collection("Post")
          .insertOne(this)
          .catch((err) => {
            throw err;
          });
        return this;
      } else {
        throw new Error("Creator Does not exist in Team!");
      }
    } else {
      throw new Error("Wall Does not exist!");
    }
  }

  async edit() {
    const db = getDB();
    const query = { _id: Mongodb.ObjectID(this._id) };

    const update = {
      $set: {
        caption: this.caption,
        description: this.description,
        likes: this.likes,
        comments: this.comments,
        creator: this.creator,
        wall: this.wall,
        created_at: this.created_at,
        updated_at: this.updated_at,
      },
    };

    const result = await db
      .collection("Post")
      .updateOne(query, update)
      .catch((err) => {
        throw err;
      });

    return result.result;
  }

  static async getAllPost() {
    const db = getDB();
    const result = await db
      .collection("Post")
      .find({})
      .toArray()
      .catch((err) => {
        throw err;
      });

    return result;
  }

  static async getPostById(id) {
    const db = getDB();
    const query = { _id: Mongodb.ObjectID(id) };
    const result = await db
      .collection("Post")
      .findOne(query)
      .catch((err) => {
        throw err;
      });
    if (result) {
      const comment_query = { postId: Mongodb.ObjectID(id) };
      const comments = await db
        .collection("Comment")
        .find(comment_query)
        .toArray()
        .catch((err) => {
          throw err;
        });
      return { ...result, comments };
    } else return null;
  }

  static async deletePost(id) {
    const db = getDB();
    let comment_clean;
    let query = { _id: Mongodb.ObjectID(id) };
    const projection = { _id: 0, comments: 1 };
    var post_comments = await db
      .collection("Post")
      .find(query)
      .project(projection)
      .toArray()
      .catch((err) => {
        throw err;
      });
    if (post_comments.length > 0) {
      post_comments = post_comments[0].comments;
      if (post_comments && post_comments.length > 0) {
        const delete_query = {
          _id: { $in: post_comments },
        };
        comment_clean = await db
          .collection("Comment")
          .deleteMany(delete_query)
          .catch((err) => {
            throw err;
          });
      }
    } else {
      throw new Error("No Post Found with this Post Id.");
    }
    const result = await db
      .collection("Post")
      .deleteOne(query)
      .catch((err) => {
        throw err;
      });

    return { result, comment_clean };
  }
}

module.exports = Post;
