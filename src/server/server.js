const express = require('express');
const app = express();
const favicon = require('serve-favicon');

app.use(favicon(__dirname + "../../../public/favicon.ico"));
app.use('/images', express.static("public/images"));

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080 !');
});