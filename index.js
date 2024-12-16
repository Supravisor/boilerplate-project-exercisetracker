
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

// array for users
let userData = [];

// POST for users
app.post("/api/users/", function(req, res) {
//  let newUser = { "username": "test" };
  let newUser = { "username": req.body.username };
  console.log(newUser);
  let id = new Date().getTime();

  if (!userData.includes(newUser)) {
    newUser._id = id;
    userData.push(newUser);
  }

  console.log( { "username": newUser.username, _id: newUser._id } );
  res.json( { "username": newUser.username, _id: newUser._id } );
});

// POST for username
app.post("/api/users/username", function(req, res) {
  //  let newUser = { "username": "test" };
    let newUser = { "username": req.body.url };
    let id = new Date().getTime();
  
    if (!userData.includes(newUser)) {
      newUser._id = id;
      userData.push(newUser);
    }
  
    console.log( { "username": newUser.username, _id: newUser._id } );
    res.json( { "username": newUser.username, _id: newUser._id } );
  });

// GET for users
app.get("/api/users", function(req, res) {
  res.json(userData);
});
