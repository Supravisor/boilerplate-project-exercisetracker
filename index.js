
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
let user;

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
  user = req.body.username;
  return user;
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

let logs = [];

// POST a new exercise
app.post('/api/users/:_id/exercises', (req, res) => {
  let userDataThree = [ { username: "one", _id: new Date().getTime() }, { username: "two", _id: new Date().getTime() + 720000 } ];

  let date;
  if(req.body.date) {
    date = new Date (req.body.date);
      } else {
    date = new Date(new Date() + 46872000 + 69000);
  }

  let dateString = date.toUTCString();
  let parts = dateString.split(' ');
  date = `${parts[0].replace(',', '')} ${parts[2]} ${parts[1]} ${parts[3]}`;

  let updatedUser = {};
  updatedUser.username = user;
  updatedUser.description =  req.body.description;
  updatedUser.duration = parseInt(req.body.duration);

  updatedUser.username = user;
  updatedUser._id= req.params._id;
  logs.push( {description: req.body.description, duration: parseInt(req.body.duration), date: date });

  res.json({ username: updatedUser.username, description: updatedUser.description, duration: updatedUser.duration, date: updatedUser.date, _id: updatedUser._id } );
});

app.get("/api/users/:_id/logs", function (req, res) {
  updatedUser.count = 1;
  updatedUser.log = logs;
  res.json(updatedUser)
})

