const express = require("express");
const app = express();
const Database = require("./Utils/database");
const Morgan = require("morgan");
const ApiDocs = require("./ApiDoc.json");

app.use(Morgan("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const authRoutes = require("./Routes/authRoutes");
const teamRoutes = require("./Routes/teamRoutes");
const postRoutes = require("./Routes/postRoutes");

app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/team", teamRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error!",
  });
});

app.use("/", (req, res) => {
  res.status(200).json({
    message: "Api is here but You seems to be lost in space!",
    availableRoutes: ApiDocs,
  });
});

Database.connectDB(() => {
  app.listen(9000);
});
