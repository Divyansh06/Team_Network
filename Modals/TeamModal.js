const Mongo = require("mongodb");
const { getDB } = require("../Utils/database");

class Team {
  constructor(name, description, category, creator, users, created_at, id) {
    this._id = id || new Mongo.ObjectID();
    this.name = name;
    this.description = description;
    this.category = category;
    this.users = users || [{ userId: creator, role: "Admin" }];
    this.creator = creator;
    this.created_at = created_at || new Date().getTime();
    this.updated_at = new Date().getTime();
  }

  async save() {
    const db = getDB();
    const query = { _id: Mongo.ObjectID(this.creator) };
    const update = {
      $addToSet: { teams: this._id.toString() },
    };

    const result = await db
      .collection("Team")
      .insertOne(this)
      .catch((err) => {
        throw err;
      });

    const userAssociation = await db
      .collection("User")
      .updateOne(query, update)
      .catch((err) => {
        throw err;
      });

    return this;
  }

  static async getAllTeams() {
    const db = getDB();
    const result = await db.collection("Team").find().toArray();
    return result;
  }

  static async findById(teamId) {
    const db = getDB();
    const query = { _id: Mongo.ObjectID(teamId) };
    const result = await db.collection("Team").findOne(query);
    return result;
  }
}

module.exports = Team;
