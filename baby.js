console.log("Linking");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var ip = require("ip");
var app = express();
var d = new Date();
var nothing = "Nothing";
var time1 ;
timeIs = (d.getMonth()+1).toString() + "/" + d.getDate().toString() + "/" + d.getFullYear().toString() + " " + d.getHours().toString() + ":" + d.getMinutes().toString();
time1 = timeIs;
// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8085;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.argv[2],
  database: "baby_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});
app.post('/poop', function(req,res){
    
    connection.query("INSERT INTO babyThings SET ?",
      {
        sleeping: nothing,
        feeding: nothing,
       diaperChange: time1 
    },function(err,result){
        console.log( time1);
        res.redirect("/");
    }
)

});
app.post('/feeding', function(req,res){
    
    connection.query("INSERT INTO babyThings SET ?",
      {
        sleeping: nothing,
       feeding: time1, 
       diaperChange: nothing
    },function(err,result){
        console.log( time1);
        res.redirect("/");
    }
)

});
app.post('/sleep', function(req,res){
    
    connection.query("INSERT INTO babyThings SET ?",
      {
       sleeping: time1,
       diaperChange: nothing, 
       feeding: nothing,
    },function(err,result){
        console.log( time1);
        res.redirect("/");
    }
)

});
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "baby.html"));
    
  });
app.get("/api", function (req,res){
    connection.query("SELECT * FROM babyThings;", function(err, data) {
        if (err) throw err;
        console.log('The solution is: ', data);
        res.json(data);
      });
});

  app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
    console.log("Server listening on: " + ip.address() +":" + PORT);
  });
