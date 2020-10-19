const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const pokemonsRouter = require("./routes/pokemons");

app.use(favicon(__dirname + "../../../public/favicon.ico"));
app.use('/images', express.static("public/images"));

app.use("/api/pokemons", pokemonsRouter);

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function () {
  console.log('Pokemons app listening on port 8080 !');
});