const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

var app = express();

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {contactForm} = require('./models/contactForm');
var {responseData} = require('./models/responseData');

var http = require('http').Server(app);
var io = require('socket.io')(http);

// var router = express.Router();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

io.on('connection', (socket) => {
  socket.on('chat', (message, username) => {
    console.log(`Sent by ${username}, content: ${message}`);
    io.emit('chat', message, username);
  });
});

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'firstName', 'lastName', 'password']);
  var user = new User(body);

  user.save().then(() => {
    res.render('user');
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/account/show', (req, res) => {
  User.find().then((users) => {
    res.send({users});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/account/show/:id', (req, res) => {
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
app.post('/account/create', (req, res) => {
  var body = _.pick(req.body, ['email', 'firstName', 'lastName', 'password']);
  var user = new User(body);

  user.save().then(() => {
    res.send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.delete('/account/remove/:id', (req, res) => {
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

app.patch('/account/update/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['email', 'firstName', 'lastName', 'password', 'createdAt']);

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

app.get('/signup', (req, res) => {
  res.render('signup');
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

app.get('/contactform/show', (req, res) => {
  contactForm.find().then((forms) => {
    res.send({forms});
  }), (e) => {
    res.status(400).send(e);
  };
});

app.get('/contactform/show/:id', (req, res) => {
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

app.post('/contactform/create', (req, res) => {
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
      });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/restapi', (req, res) => {
  res.render('restapi');
});

app.get('/user', (req, res) => {
  res.render('user');
});

app.get('/chaterror', (req, res) => {
  res.render('chaterror');
});

<!-- Database Site -->

app.get('/responseData', (req, res) => {
  responseData.find().then((users) => {
    res.send({users});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/responseData/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  responseData.findById(id).then((user) => {
    if (!user) {
      return res.status(404).send();
    }

    res.send({user});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.post('/responseData', (req, res) => {
  var body = _.pick(req.body, ['email']);
  var user = new responseData(body);

  user.save().then(() => {
    res.send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.delete('/responseData/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  responseData.findByIdAndRemove(id).then((user) => {
    if (!user) {
      return res.status(404).send();
    }

    res.send({user});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

var port = 3000;
http.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
