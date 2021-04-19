var http = require('http');
var fs = require('fs');
var ejs = require('ejs');


var temp = fs.readFileSync('./temp.ejs', 'utf-8');
var main = fs.readFileSync('./main.ejs', 'utf-8');
var sub = fs.readFileSync('./sub.ejs', 'utf-8');

var server = http.createServer(function(req, res) {
  var data = ejs.render(main, {
    contents: ejs.render(sub, {
      data: '<p>hogehoge</p>'
    })
  });
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  res.end();
});

server.listen(1234);
console.log('サーバーを起動しました');
