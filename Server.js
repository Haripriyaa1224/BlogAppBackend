const express = require ('express');
const authRoutes = require('./Routes/auth');
const postRoutes = require('./Routes/posts');
const { default: mongoose } = require('mongoose');
const jwtValidation = require('./Middleware/jwtValidation');
// const dotenv = require('dotenv')

// dotenv.config();

// console.log(process.env.CONNECTION_STRING);

const app = express();

app.use(express.json());

//Configuration for dotenv
require('dotenv').config();
const port = process.env.PORT;

app.use('/auth', authRoutes);
app.use(jwtValidation, postRoutes);

//connection to DB
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{console.log("Connected to DB")})
.catch((err)=>{console.log("Error connecting to DB", err)})

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})