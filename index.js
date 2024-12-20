
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

  let newUser = { "username": req.body.username };
  newUser._id = new Date().getTime();

  for (let i=0; i<userData.length; i++) {
    if (userData[i].username !== newUser.username) {
      return userData.push(newUser);
    }
  }

  console.log( { "username": newUser.username, _id: newUser._id } );
  res.json( { "username": newUser.username, _id: newUser._id } );
});

// GET for users
app.get("/api/users", function (req, res) {
    let userDataTwo = [ { username: "one", _id: new Date().getTime() }, { username: "two", _id: new Date().getTime() + 720000 } ];
    const users = userDataTwo;
    res.json(users.map((user)=>({
    username: user.username,
    _id: user._id.toString(),
    })))
})
