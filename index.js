const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

const authorizedUsers = [
  {
    email: 'test@test.com',
    password: 'hellow',
  }
];

function isAuth(email, password) {
  let isAuth = false;
  authorizedUsers.forEach(user => {
    if (user.email === email && user.password === password) {
      isAuth = true;
    };
  });

  return isAuth;
}

function withAuth(req, res, next) {
  if (isAuth(req.body.email, req.body.password)) {
    next();
  }

  res.send('NOT AUTHENTICATED!');
}

// ==================
// GLOBAL REQUESTS
app.get('/', (req, res) => {
  res.sendFile('index.html');
});
// ==================


// ==================
// LOGIN ENDPOINTS
app.get('/login', (req, res) => {
  res.sendFile('login.html', { 
    root: `${__dirname}/public`
   });
});
// ==================



// ==================
// SIGNUP ENDPOINTS
app.get('/signup', (req, res) => {
  res.sendFile('signup.html', { 
    root: `${__dirname}/public`
   });
});

app.post('/signup', bodyParser.urlencoded({ extended: false }),  (req, res) => {
  authorizedUsers.push({ email: req.body.email, password: req.body.password });
  res.redirect('/signup');
})
// ==================


// ==================
// SECRET ENDPOINTS
app.get('/secret', (req, res) => {
  res.sendFile('secret.html', { 
    root: `${__dirname}/public`
   });
})

app.post('/secret', withAuth, (req, res) => {
  res.send('The well in your town has gold.');  
})
// ==================




// ==================
app.listen(3000, () => {
  console.log('Server started');
});
// ==================
