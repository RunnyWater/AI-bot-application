const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
 secret: 'secret',
 resave: true,
 saveUninitialized: true
}));

const connection = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: '12345',
 database: 'demo'
});

connection.connect(err => {
 if (err) throw err;
 console.log('Connected to MySQL');
});

// Registration route
app.post('/register', (req, res) => {
 const { username, password, email } = req.body;
 res.send('Registration successful');
 bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    const sql = 'INSERT INTO accounts (username, password, email) VALUES (?, ?, ?)';
    connection.query(sql, [username, hash, email], (err, result) => {
      if (err) throw err;
      res.send('Registration successful');
    });
 });
});


// Login route
app.post('/login', (req, res) => {
 const { username, password } = req.body;
 const sql = 'SELECT * FROM accounts WHERE username = ?';
 connection.query(sql, [username], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          req.session.loggedin = true;
          req.session.username = username;
          res.send('Login successful');
        } else {
          res.send('Incorrect password');
        }
      });
    } else {
      res.send('User not found');
    }
 });
});

app.listen(3000, () => {
 console.log('Server started on port 3000');
});
app.use(express.static('public'));
app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, './public/register.html'));
  });
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, './public/login.html'));
  });
