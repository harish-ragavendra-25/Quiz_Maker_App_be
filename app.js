const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./Routers/authRoute');
const questionRoutes = require('./Routers/questionRoute');
const userRoutes = require('./Routers/userRoute');

const dotenv = require('dotenv').config();

const dbConnect = require('./config/dbconnection');
dbConnect();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

//auth
app.use('/api/auth',authRoutes);

//questions
app.use('/api/questions',questionRoutes);

//users
app.use('/api/user',userRoutes);

app.use('*',(req,res) => {
    res.send('Invalid URL');
})

app.listen(PORT,() => {
    console.log(`Server listening to ${PORT}`)
})