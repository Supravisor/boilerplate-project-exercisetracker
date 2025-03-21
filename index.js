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

let updatedUser = {};
let logs = [];
let count = 0;
// POST a new exercise
app.post('/api/users/:_id/exercises', (req, res) => {
  let userDataThree = [ { username: "one", _id: new Date().getTime() }, { username: "two", _id: new Date().getTime() + 720000 } ];
  logs = [];
  let date;
  if(req.body.date) {
    date = new Date (req.body.date);
      } else {
    date = new Date(new Date() + 46872000 + 69000);
  }

  let dateString = date.toUTCString();
  let parts = dateString.split(' ');
  date = `${parts[0].replace(',', '')} ${parts[2]} ${parts[1]} ${parts[3]}`;

  updatedUser.username = user;
  updatedUser.description =  req.body.description;
  updatedUser.duration = parseInt(req.body.duration);
  updatedUser.date = date;
  updatedUser._id= req.params._id;
  count++;
  logs.push( {
    description: req.body.description, 
    duration: parseInt(req.body.duration), 
    date: date 
  });
  res.json({ username: updatedUser.username, description: updatedUser.description, duration: updatedUser.duration, date: updatedUser.date, _id: updatedUser._id } );
  return updatedUser;
});


app.get("/api/users/:_id/logs", function (req, res) {
  const { from, to, limit } = req.query;

  if (from || to || limit) {
  let selection = 
    {
      username: "fcc_test",
      count: 1,
      _id: "5fb5853f734231456ccb3b05",
      log: [
        {
        description: "test",
        duration: 60,
        date: "Mon Dec 31 1989",
      },
      {
        description: "test",
        duration: 60,
        date: "Mon Jan 04 1990",
      },
      {
        description: "test",
        duration: 60,
        date: "Mon Jan 01 2022",
      }
    ]
    };

  if (from) {
    selection.log = selection.log.filter((exercise)=>
     new Date(exercise.date)  >= new Date(from))
  } if (to) {
      selection.log = selection.log.filter((exercise)=>
      new Date(exercise.date) <= new Date(to))
  } if (limit) {
      selection.log = selectedPerson.log.slice(0 ,limit);
  }

  return res.json({
    _id: selection._id.toString(),
    username: selection.username,
    count: selection.log.length,
    log: selectedPerson.log.map((exercise)=>({
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date}))
  })
  } else {
      updatedUser.count = count; 
      return res.json({ 
        username: updatedUser.username, 
        count: updatedUser.count,
        _id: updatedUser._id, 
        log: logs
      });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
