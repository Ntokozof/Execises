const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();

//Connecting to Database
mongoose.connect('mongodb://localhost/exercises', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;

db.once('open', () => {
    console.log('Connecte to Mongodb database');
})

//Middlewares
app.use(bodyParser.json());


//Routes
app.get('/', (req, res) => {
    res.send('We are on home');
})

const ExercisesRoute = require('./routes/Execises');

app.use('/v1/exercises', ExercisesRoute); 


// How do we start listing to the server
app.listen(3000, console.log("Listing on port 3000"));