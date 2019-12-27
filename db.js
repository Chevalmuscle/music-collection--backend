const { MongoClient, ObjectID } = require("mongodb");
const connectionUrl = process.env.MONGO_CONNECTION_URI;
const dbName = "music-collection";
let db;

const init = () =>
  MongoClient.connect(connectionUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }).then(client => {
    db = client.db(dbName);
  });

const getAlbums = () => {
  const collection = db.collection("albums");
  return collection.find().toArray();
};

const getAlbumById = id => {
  const collection = db.collection("albums");
  return collection.findOne({ _id: ObjectID(id) });
};

module.exports = { init, getAlbums, getAlbumById };
