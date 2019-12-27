const MongoClient = require("mongodb").MongoClient;
const url = process.env.MONGO_CONNECTION_URI;

let findAlbums = function(db, callback) {
  let collection = db.db("music-collection").collection("albums");
  collection.find().toArray(function(err, docs) {
    if (err !== null) {
      console.log(err);
    }
    callback(docs);
  });
};

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
  if (err !== null) {
    console.log(err);
  }
  findAlbums(db, function(albums) {
    exports.getAlbums = function() {
      return albums;
    };
    db.close();
  });
});
