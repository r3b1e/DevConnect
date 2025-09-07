const express = require('express');
const dbConnect = require('./src/config/db');
const {register, login, logout, updateProfile} = require('./src/controllers/authController');
const ConnectionRoutes = require('./src/routes/requestRoutes');
const protect = require("./src/middleware/authMiddleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require('./src/routes/authRoutes');


dbConnect();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173" || "*", // Allows requests from frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Permitted HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Headers for JSON & JWT
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/request", ConnectionRoutes);

// app.use('/', (req, res)=>{
//     res.send('hello world');
// })

app.use('/admin', (req, res) => {
    res.send('admin hello');
})

app.listen(8080, ()=>{
    console.log("working on port 8080");
})