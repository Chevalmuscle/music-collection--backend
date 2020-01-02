const express = require("express");
var cors = require("cors");
const {
  getAlbums,
  getAlbumById,
  getAdjacentAlbums,
  getArtists,
  getArtistByName,
  init,
} = require("./db");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("hello world !");
});

app.get("/albums", (req, res) => {
  getAlbums().then(albums => res.json(albums));
});

app.get("/albums/:id", (req, res) => {
  getAlbumById(req.params.id).then(album => res.json(album));
});

app.get("/albums/:id/:adjacentAlbumsCount", (req, res) => {
  getAdjacentAlbums(
    req.params.id,
    parseInt(req.params.adjacentAlbumsCount),
  ).then(albums => res.json(albums));
});

app.get("/artists", (req, res) => {
  getArtists().then(artists => res.json(artists));
});

app.get("/artists/:name", (req, res) => {
  getArtistByName(req.params.name).then(artist => res.json(artist));
});

init().then(() =>
  app.listen(PORT, function() {
    console.log(`listening on port ${PORT} 🐷`);
  }),
);
