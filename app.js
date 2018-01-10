const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

var app = express();

// const store = require('./models/store');
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {contactForm} = require('./models/contactForm');

// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// var router = express.Router();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
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
  var body = _.pick(req.body, ['email', 'firstName', 'lastName', 'password']);
  var user = new User(body);

  user.save().then(() => {
    res.render('registered');
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  User.find().then((users) => {
    res.send({users});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/register/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  User.findById(id).then((user) => {
    if (!user) {
      return res.status(404).send();
    }

    res.send({user});
  }).catch((e) => {
    res.status(400).send();
  });
});

// Same functionality as post function above '/login'
// But this function is aimed for Postman Users.
app.post('/register', (req, res) => {
  var body = _.pick(req.body, ['email', 'firstName', 'lastName', 'password']);
  var user = new User(body);

  user.save().then(() => {
    res.send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.delete('/register/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }

  User.findByIdAndRemove(id).then((user) => {
    if (!user) {
      return res.status(404).send();
    }

    res.send({user});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.patch('/register/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['email', 'firstName', 'lastName', 'password']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  User.findByIdAndUpdate(id, {$set: body}, {new: true}).then((user) => {
    if (!user) {
      return res.status(404).send();
    }

    res.send({user});
  }).catch((e) => {
    res.status(400).send(e);
  });
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

app.get('/contactform', (req, res) => {
  contactForm.find().then((forms) => {
    res.send({forms});
  }), (e) => {
    res.status(400).send(e);
  };
});

app.get('/contactform/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  contactForm.findById(id).then((form) => {
    if (!form) {
      return res.status(404).send();
    }

    res.send({form});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.post('/contactform', (req, res) => {
  var body = _.pick(req.body, ['name', 'email', 'subject', 'message', 'createdAt']);
  var contactform = new contactForm(body);

  contactform.save().then(() => {
    res.send(contactform);
  }).catch((e) => {
    res.status(400).send(e);
  });
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
