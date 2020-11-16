const Mongo = require("mongodb");
const { getDB } = require("../Utils/database");

class User {
  constructor(name, email, password, teams, created_at, id) {
    this._id = id || new Mongo.ObjectID();
    this.name = name;
    this.email = email;
    this.password = password;
    this.teams = teams || [];
    this.created_at = created_at || new Date().getTime();
    this.updated_at = new Date().getTime();
  }

  async save() {
    const db = getDB();
    const userFound = await db
      .collection("User")
      .findOne({ email: this.email })
      .catch((err) => {
        throw err;
      });
    if (userFound) {
      throw new Error("Email address already exists.");
    } else {
      const result = await db
        .collection("User")
        .insertOne(this)
        .catch((err) => {
          throw err;
        });
      return {
        userId: this._id,
        name: this.name,
        email: this.email,
      };
    }
  }

  static async findById(id) {
    const db = getDB();
    const query = { _id: Mongo.ObjectID(id) };
    const result = await db.collection("User").findOne(query);
    return result;
  }

  static async findByEmail(email) {
    const db = getDB();
    const query = { email };
    const result = await db.collection("User").findOne(query);
    return result;
  }

  static async findAllTeam(userId) {
    const db = getDB();
    const query = { _id: Mongo.ObjectID(userId) };
    const projection = { _id: 0, teams: 1 };
    const result = await db
      .collection("User")
      .find(query)
      .project(projection)
      .toArray()
      .catch((err) => {
        throw err;
      });
    return result;
  }
}

module.exports = User;
