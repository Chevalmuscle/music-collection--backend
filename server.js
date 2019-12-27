const express = require("express");
var cors = require('cors');
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3001

app.use(cors({origin: '*'}));

app.get("/", (req, res) => {
  res.send("hello world !");
});

app.get("/albums", (req, res) => {
  res.jsonp(db.getAlbums());
});

app.listen(PORT, function() {
  console.log(`listening on port ${PORT} 🐷`);
});
