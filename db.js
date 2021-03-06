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
  return collection
    .find()
    .toArray()
    .then(data => data.sort((a, b) => (a.order > b.order ? 1 : -1)));
};

const getAlbumById = id => {
  const collection = db.collection("albums");
  return collection.findOne({ _id: ObjectID(id) });
};

const getAdjacentAlbums = (id, adjacentAlbumsCount) => {
  const adjacentAlbums = [];

  return getAlbums().then(albums => {
    albums.forEach((album, index) => {
      if (album._id.toString() === id) {
        // previous albums
        for (let i = index - adjacentAlbumsCount; i < index; i++) {
          adjacentAlbums.push(albums[i]);
        }
        // following albums
        for (let i = index + 1; i < index + adjacentAlbumsCount + 1; i++) {
          adjacentAlbums.push(albums[i]);
        }
      }
    });
    return adjacentAlbums;
  });
};

const getArtists = () => {
  const collection = db.collection("albums");
  return collection
    .find()
    .toArray()
    .then(data => Array.from(new Set(data.map(album => album.artists).flat())));
};

const getArtistByName = name => {
  const collection = db.collection("albums");
  return collection
    .find()
    .toArray()
    .then(everyAlbums => {
      const albums = everyAlbums.filter(album => {
        var regex = new RegExp(album.artists.join("|"), "i");
        return regex.test(name);
      });

      return { albums: albums };
    });
};

module.exports = {
  init,
  getAlbums,
  getAlbumById,
  getAdjacentAlbums,
  getArtists,
  getArtistByName,
};
