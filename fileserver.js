var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function(req, res) {
  var urlParts = url.parse(req.url, true);
  var path = __dirname + '/' + urlParts.pathname;
  var stream = fs.createReadStream(path);
  stream.pipe(res);
});


server.listen(1234);
console.log('サーバーを起動しました');
