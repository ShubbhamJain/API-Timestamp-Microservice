// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
// {"unix": <date.getTime()>, "utc" : <date.toUTCString()> }
app.get("/api/timestamp/:date?", function (req, res) {
  let dateStr = req.params.date;
  let date;
  if (!dateStr) {
    date = new Date();
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  } else {
    date = new Date(dateStr);
    if (date.toString() === "Invalid Date") {
      date = new Date(parseInt(dateStr));
    }
    if (date.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
      });
    }
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
