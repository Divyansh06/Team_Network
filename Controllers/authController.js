const User = require("../Modals/UserModal");
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getDB } = require("../Utils/database");
const { ObjectID } = require("mongodb");

module.exports.createUser = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashed_password = await Bcrypt.hash(password, 10);
    const user = new User(name, email, hashed_password);
    const result = await user.save();
    res.status(201).json({ message: "User Created!", user: result });
  } catch (err) {
    next(err);
  }
};

module.exports.loginUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findByEmail(email);
  if (user) {
    Bcrypt.compare(password, user.password, (err, same) => {
      if (err) {
        throw err;
      }
      if (same) {
        var token = jwt.sign(
          {
            userId: user._id,
            name: user.name,
            email: user.email,
          },
          "process.env.JWT_SECRET",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          userId: user._id,
          token,
          expiresIn: new Date().getTime() + 60 * 60 * 1000,
        });
      } else {
        res.status(402).json({
          message: "Password not valid!",
        });
      }
    });
  } else
    res.status(402).json({ message: "Please enter correct Email address!" });
};

module.exports.logoutUser = async (req, res, next) => {};

module.exports.editUserInfo = async (req, res, next) => {};

module.exports.deleteUser = async (req, res, next) => {
  const { userId } = req.body;
  const db = getDB();
  try {
    const query = { _id: ObjectID(userId) };
    const result = await db.collection("User").deleteOne(query);
    if (result.result.n) {
      res.status(201).json({ message: "User Deleted!" });
    } else {
      next(new Error("User Not Deleted!"));
    }
  } catch (err) {
    throw err;
  }
};

module.exports.userAllPost = async (req, res, next) => {
  const { userId } = req.body;
  const db = getDB();
  try {
    const query = { creator: userId };
    const result = await db.collection("Post").find(query).toArray();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
