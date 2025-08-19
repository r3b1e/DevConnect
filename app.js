const express = require('express');
const dbConnect = require('./src/config/db');
const {register, login, logout, updateProfile} = require('./src/controllers/authController');
const protect = require("./src/middleware/authMiddleware");
const cookieParser = require("cookie-parser");


dbConnect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.post('/signup', register);
app.post('/signin', login);
app.post('/logout', logout);
app.post("/updatedetails", protect, updateProfile);

// app.use('/', (req, res)=>{
//     res.send('hello world');
// })

app.use('/admin', (req, res) => {
    res.send('admin hello');
})

app.listen(8080, ()=>{
    console.log("working on port 8080");
})