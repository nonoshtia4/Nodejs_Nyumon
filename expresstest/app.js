var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');

var msg ='';

app.engine('ejs', ejs.renderFile);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(session({
  secret: 'hoge',
  resave: true,
  saveUninitialized: true,
}));

app.get('/', function(req, res){
  var cnt = req.cookies.cnt == undefined ? 0 : req.cookies.cnt;
  var cnt_session = req.session.cnt == undefined ? 0 : req.session.cnt;
  cnt_session++;
  cnt++;
  req.session.cnt = cnt_session;
  res.cookie('cnt', cnt, {maxAge:5000});

  console.log('---GET Request---');
  console.log('nameは' + req.query.name);
  console.log('ageは' + req.query.age);
  res.render('temp.ejs', {
    cnt: cnt,
    cnt_session: cnt_session
  });
});

app.post('/', function(req, res){
  console.log('---POST Request---');
  console.log('nameは' + req.body.name);
  console.log('ageは' + req.body.age);
  res.render('temp.ejs', {});
});
app.post('/ajax', function(req, res){
  msg += 'hoge';
  res.json({
    msg: msg
  });
});

var server = app.listen(1234, function(){
  console.log('サーバーを起動しました');
});
