const { getDB } = require("../Utils/database");
const { ObjectID } = require("mongodb");
const Team = require("../Modals/TeamModal");

module.exports.getTeams = async (req, res, next) => {
  try {
    const teams = await Team.getAllTeams();
    if (teams) {
      res.status(200).json(teams);
    } else next(new Error("Unable to Fetch all Teams!"));
  } catch (error) {
    next(error);
  }
};

module.exports.getTeam = async (req, res, next) => {
  const { teamId } = req.params;
  try {
    const teams = await Team.findById(teamId);
    if (teams) {
      res.status(200).json(teams);
    } else next(new Error("No team found with this Id."));
  } catch (err) {
    next(err);
  }
};

module.exports.createTeam = async (req, res, next) => {
  const { name, description, category, creator } = req.body;
  const team = new Team(name, description, category, creator);
  try {
    const result = await team.save();
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports.joinTeam = async (req, res, next) => {
  const { userId, teamId } = req.body;
  const db = getDB();
  try {
    const Team = await db.collection("Team").findOne({ _id: ObjectID(teamId) });
    if (Team) {
      const user_exist = await Team.users.find(
        (item) => item.userId === userId
      );
      if (!user_exist) {
        const team_query = { _id: ObjectID(teamId) };
        const team_update = {
          $addToSet: {
            users: {
              userId: userId,
              role: "Member",
            },
          },
        };
        const user_query = { _id: ObjectID(userId) };
        const user_update = {
          $addToSet: {
            teams: teamId,
          },
        };

        const teamOperation = await db
          .collection("Team")
          .updateOne(team_query, team_update)
          .catch((err) => next(err));

        const userOperation = await db
          .collection("User")
          .updateOne(user_query, user_update)
          .catch((err) => next(err));

        res.status(201).json({
          message: "Team Successfully Joined!",
        });
      } else res.status(422).json({ message: "User already exist in team!" });
    } else {
      res.status(422).json({ message: "No team exist with this id!" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.leaveTeam = async (req, res, next) => {
  const { userId, teamId } = req.body;
  const db = getDB();
  try {
    const team_query = { _id: ObjectID(teamId) };
    const team_update = {
      $pull: {
        users: {
          userId: userId,
        },
      },
    };
    const user_query = { _id: ObjectID(userId) };
    const user_update = {
      $pull: {
        teams: teamId,
      },
    };

    const teamOperation = await db
      .collection("Team")
      .updateOne(team_query, team_update)
      .catch((err) => next(err));

    const userOperation = await db
      .collection("User")
      .updateOne(user_query, user_update)
      .catch((err) => next(err));

    res.status(201).json({
      message: "Team Succefully Left!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTeam = async (req, res, next) => {
  const { teamId, userId } = req.body;
  const db = getDB();
  const team = await Team.findById(teamId);
  if (team) {
    const user = team.users.find((item) => item.userId === userId);
    if (user.role === "Admin") {
      const team_query = { _id: ObjectID(teamId) };
      const user_query = { teams: teamId };
      const user_update = {
        $pull: {
          teams: teamId,
        },
      };

      const team_operation = await db
        .collection("Team")
        .deleteOne(team_query)
        .catch((err) => {
          next(err);
        });

      const userOperation = await db
        .collection("User")
        .updateMany(user_query, user_update)
        .catch((err) => next(err));

      res.status(201).json({ message: "Team successfully deleted!" });
    } else {
      res
        .status(422)
        .json({ message: "User not authorised to delete this team!" });
    }
  } else {
    res.status(422).json({
      message: "No team Found with this Id!",
    });
  }
};

module.exports.makeTeamAdmin = async (req, res, next) => {
  const { teamId, userId, creator } = req.body;
  const db = getDB();
  const Team = await db.collection("Team").findOne({ _id: ObjectID(teamId) });

  if (Team) {
    const user_exist = await Team.users.find((item) => item.userId === userId);
    const admin_creator = await Team.users.find(
      (item) => item.userId === creator
    );
    if (user_exist) {
      const query = {
        _id: ObjectID(teamId),
        users: {
          $elemMatch: { userId: userId },
        },
      };
      const update = {
        $set: {
          "users.$.role": "Admin",
        },
      };
      const team_operation = await db
        .collection("Team")
        .updateOne(query, update)
        .catch((err) => next(err));
      res.status(210).json({ message: "User role changed to Admin!" });
    } else {
      res.status(422).json({ message: "User not exist or not authorised!" });
    }
  }
};

module.exports.removeTeamAdmin = async (req, res, next) => {
  const { teamId, userId, creator } = req.body;
  const db = getDB();
  const Team = await db.collection("Team").findOne({ _id: ObjectID(teamId) });

  if (Team) {
    const user_exist = await Team.users.find((item) => item.userId === userId);
    const admin_creator = await Team.users.find(
      (item) => item.userId === creator
    );
    if (user_exist && admin_creator.role === "Admin") {
      const query = {
        _id: ObjectID(teamId),
        users: {
          $elemMatch: { userId: userId },
        },
      };
      const update = {
        $set: {
          "users.$.role": "Member",
        },
      };
      const team_operation = await db
        .collection("Team")
        .updateOne(query, update)
        .catch((err) => next(err));
      res.status(210).json({ message: "User role changed to Member!" });
    } else {
      res.status(422).json({ message: "User not exist or not authorised!" });
    }
  }
};

module.exports.wallPosts = async (req, res, next) => {
  const { teamId } = req.body;
  const db = getDB();
  const query = { wall: teamId };
  const posts = await db
    .collection("Post")
    .find(query)
    .toArray()
    .catch((err) => next(err));
  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(422).json({ message: "No team with this is Id found!" });
  }
};

module.exports.teamMembers = async (req, res, next) => {
  const { teamId } = req.body;
  const db = getDB();
  const query = { teams: teamId };
  const users = await db
    .collection("User")
    .find(query)
    .toArray()
    .catch((err) => next(err));
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(422).json({ message: "No team with this is Id found!" });
  }
};
