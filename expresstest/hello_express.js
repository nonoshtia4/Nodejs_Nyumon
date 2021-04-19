var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Hello Express');
});


var server = app.listen(1234, function() {
  console.log('サーバーを起動しました');
});
