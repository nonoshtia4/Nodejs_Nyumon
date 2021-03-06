var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var indexPage = fs.readFileSync('./index.html', 'utf-8');

//var nextPage = fs.readFileSync('./next.html', 'utf-8');
var server = http.createServer(function(req, res) {
  var urlParts = url.parse(req.url, true);
  var path = __dirname + '/' + urlParts.pathname;
  var stream = fs.createReadStream(path);
  stream.on('data', function(data) {
    res.write(data);
  });
  stream.on('end', function(data) {
    res.end();
  });

  if(req.method == 'GET'){
    var urlParts = url.parse(req.url, true);
    console.log('--GET Request');
    console.log('nameは' + urlParts.query.name);
    console.log('ageは' + urlParts.query.age);
  } else {
    var body = '';
    req.on('data', function(data){
      body += data;
    });
    req.on('end', function() {
      var params = qs.parse(body);
      console.log('--POST Request');
      console.log('nameは' + params.name);
      console.log('ageは' + params.age);
    });
  }
  //var target = '';
  //switch (req.url) {
  //  case '/':
  //  case '/index':
  //    target = indexPage;
  //    break;
  //  case '/next':
  //    target = nextPage;
  //    break;
  //  default:
  //    res.writeHead(404, {'Content-Type': 'text/plain'});
  //    res.end('bd request');
  //    return;
  //}

  res.writeHead(200, {'Content-Type':'text/html'});
  res.write(indexPage);
  res.end();
});


server.listen(1234);
console.log('サーバーを起動しました');
