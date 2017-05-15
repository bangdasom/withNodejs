/* Express Import */
var express = require("express");
var app = express();

/* Express port Connected */
app.listen(3000, () => {
  console.log("Connected 3000 Port!");
});

/* Module Setting */
//Nodejs fileSystem
var fs = require("fs");
//npm body-parser로 Request.body처리
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
//npm multer
var multer = require("multer");

/* Templete engine Setting */
app.set("views", "./view_file");
app.set("view engine", "jade");

/* routing */
app.get("/topic/new", (req, res) => {
  fs.readdir("data", (err, files) => {
    if(err){
      res.status(500).send("Internal Server Error");
    }
    res.render("new", {topics:files});
  });
});

app.post("/topic", (req, res) => {
  var title = req.body.title;
  var desc = req.body.desc;

  fs.writeFile ('data/'+title, desc, (err) => {
    if(err){
      res.status(500).send("Internal Server Error");
    }
    res.redirect("/topic/"+title);
  });
});

app.get(["/topic", "/topic/:pages_name"], (req, res) => {
  fs.readdir("data", (err, files) => {
    if(err){
      res.status(500).send("Internal Server Error");
    }
    
    var pages_name = req.params.pages_name;
    
    if(pages_name){
      // pages_name이 있을 때
      fs.readFile("data/"+pages_name, "utf-8", (err, data) => {
        if(err){
          res.status(500).send("Internal Server Error");
        }
        res.render("view", {topics:files, title:pages_name, desc:data});
      });
    }else{
      res.render("view", {topics:files, title:'welcome', desc:'hellow Javascript for Server'});
    }
  });
});

/*
app.get("/topic/:pages_name", (req, res) => {
  var pages_name = req.params.pages_name;

  fs.readdir("data", (err, files) => {
    if(err){
      res.status(500).send("Internal Server Error");
    }
    fs.readFile("data/"+pages_name, "utf-8", (err, data) => {
      if(err){
        res.status(500).send("Internal Server Error");
      }
      res.render("view", {topics:files, title:pages_name, desc:data});
    });
  });
});
*/

/* 파일업로드 */
var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: _storage });

app.get("/upload", (req, res) => {
  res.render("upload");
});
app.post("/upload", upload.single('userfile'), (req, res) => {
  res.send("Success! : "+ req.file);
});
