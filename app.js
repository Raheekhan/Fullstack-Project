const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/UsersTest');

var app = express();

// const store = require('./models/store');
const {User} = require('./models/user');
const {contactForm} = require('./models/contactForm');

// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// var router = express.Router();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

// io.on('connection', (socket) => {
//   socket.on('chat', (message, username) => {
//     console.log(`Sent by ${username}, content: ${message}`);
//     io.emit('chat', message, username);
//   });
// });

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/login', (req, res) => {
  var myData = new User(req.body);
  myData.save()
    .then(item => {
      res.send('item saved to database');
    })
      .catch(err => {
        res.status(400).send('Unable to save to database');
      });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/practice', (req, res) => {
  res.render('practice');
});

app.get('/database', (req, res) => {
  res.render('database');
});

app.get('/chatroom', (req, res) => {
  res.render('chatroom');
});

app.post('/contact', (req, res) => {
  var myData = new contactForm(req.body);
  myData.save()
    .then(item => {
      res.render('thankyou');
    })
      .catch(err => {
        res.status(400).send('Unable to save to database');
      })
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/user', (req, res) => {
  res.render('user');
});

app.get('/chaterror', (req, res) => {
  res.render('chaterror');
});

var port = 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
