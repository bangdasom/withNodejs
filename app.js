var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.set('view engine', 'jade');
app.set('views', './view');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.send("welcome to homepage");
});

app.get('/dynamic', (req, res) => {
  var lis ='';

  for(var i=1; i<6; i++){
    lis = lis + '<li>' + i +'</li>';
  }

  var time = Date();

  var output = `
  <!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Test</title>
</head>
<body>
    Hello, Dynamic!<br>
    ${time}
    <ul>
        ${lis}
    </ul>
</body>
</html>`;
  res.send(output);
});
app.get('/login', (req, res) => {
  res.send("login please");
});

app.get('/topic/:id', (req, res) => {
  var topics = [
      'Javascript is...',
      'Nodejs is ...',
      'Express is ...'
  ];
  var output = `
<a href="/topic?id=0">Javascript</a><br>
<a href="/topic?id=1">Nodejs</a><br>
<a href="/topic?id=2">Express</a><br><br>
${topics[req.params.id]}
`;
  res.send(output);
});

app.get("/topic/:id/:mode", (req, res) => {
  res.send(req.params.id+','+req.params.mode);
});

app.get("/form", (req, res) => {
  res.render('form');
});
app.get("/form_receiver", (req, res) => {
  var title = req.query.title;
  var description = req.query.description;
  res.send(title+','+description);
});
app.post("/form_receiver", (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  res.send(title+"+"+description);
});
app.listen(3000, function () {
  console.log('Connected 3000 port!');
});