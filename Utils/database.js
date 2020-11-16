const MongoClient = require("mongodb").MongoClient;

let uri = `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@teams.myl24.mongodb.net/${process.env.MONGO_ATLAS_DATABASE}?retryWrites=true&w=majority`;
let _DB;
function connectDB(callback) {
  const Client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  Client.connect(() => {
    callback();
    _DB = Client.db();
    console.log("<<<<<< DATABASE CONNECTED >>>>>>");
  });
}

function getDB() {
  if (_DB) {
    return _DB;
  } else return "NO DATABASE FOUND!";
}

module.exports.connectDB = connectDB;
module.exports.getDB = getDB;
