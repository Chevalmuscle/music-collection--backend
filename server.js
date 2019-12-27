const express = require("express");
var cors = require("cors");
const { init, getAlbums, getAlbumById } = require("./db");

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

init().then(() =>
  app.listen(PORT, function() {
    console.log(`listening on port ${PORT} 🐷`);
  }),
);
