import express, { json } from 'express';
import bcrypt from 'bcrypt';
import session from 'express-session';
import bodyParser from 'body-parser';
import fs from 'fs';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { log } from 'console';
import { type } from 'os';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
 secret: 'secret',
 resave: true,
 saveUninitialized: true
}));

let userId = 0;

const connection_string = process.env.CONNECTION_STRING;

const uri =connection_string // Replace with your MongoDB Atlas connection string
const client = new MongoClient(uri);
let db
var user_count;
async function connectToDatabase() {
  try {
     await client.connect();
     console.log('Connected to MongoDB');
     db = client.db('ai_extension'); // Specify your database name
     user_count = await getUserCount();
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

async function getUserCount() {
  try {
    const count = await db.collection('users').countDocuments();
    return count;
  } catch (error) {
      console.error("Error getting user count:", error);
  }
}

connectToDatabase();


const crypto = require('crypto');
const SECRET_KEY = crypto.randomBytes(64).toString('hex');

app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  console.log('register', username, password, email);
  if (await usernameExists(username)) {
    console.log("Username already exists");
    res.send("1");
  }else if (await emailExists(email)) {
    console.log("Email already exists");
    res.send("2");
    
  }else{// Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  try{
      await db.collection('users').insertOne({ user_id : parseInt(user_count+1), username, password: hashedPassword, email });
    }
  catch{
    "-1"
  }
  console.log('User registered successfully');
  user_count++;
  res.send("0");
  }
});

async function getIdByUsername(username) {
  try {
     const user = await db.collection('users').findOne({ username });
     return user.user_id;
  } catch (error) {
     console.error("Error getting user ID:", error);
     throw error; // Rethrow the error to be handled by the caller
  }
}
 
async function usernameExists(username) {
  try {
     const user = await db.collection('users').findOne({ username });
     return user !== null;
  } catch (error) {
     console.error("Error checking username:", error);
     throw error; // Rethrow the error to be handled by the caller
  }
 }
 
 async function emailExists(email) {
  try {
     const user = await db.collection('users').findOne({ email });
     return user !== null;
  } catch (error) {
     console.error("Error checking email:", error);
     throw error; // Rethrow the error to be handled by the caller
  }
 }

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('login', username, password);
 
  if (!usernameExists(username)){
    return res.send("1");
  }
  const user = await db.collection('users').findOne({ username });
  try{
    bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            res.send("1");
          };
          if (isMatch) {
            userId = getIdByUsername(username);
            res.send("0");
          } else {
            res.send("1");
          }
  // Generate JWT
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '2h' });

  // Send JWT to the client
  res.send({ token });
  localStorage.setItem('token', token);

        });
  }catch{
    res.send("1");
  }
 });
 
 fetch('/protected-route', {
  headers: {
     'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
 });

 app.use(expressJwt({ secret: SECRET_KEY, algorithms: ['HS256'] }));

 app.use(function (err, req, res, next) {
 if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token...');
 }
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
     res.status(401).send('Invalid token...');
  }
 });




app.listen(3000, () => {
 console.log('Server started on port 3000');
});

app.use(express.static('public'));

app.get('/register', (req, res) => {
  res.send(fs.readFileSync('./views/register.html', 'utf8'));
});

app.get('/login', (req, res) => {
  res.send(fs.readFileSync('./views/login.html', 'utf8'));
});

