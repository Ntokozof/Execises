const express = require('express');
const router = express.Router();
const Execise = require('../models/Execises');
const fs = require('fs');
const jwt = require('jsonwebtoken');



//Get All Execises
router.get('/', isAuthenticated, async (req, res) => {
    const execises = await Execise.find();

    res.json(execises);
});


//Create new Execise
router.post('/new', isAuthenticated, async (req, res) => {
    const newExecises = new Execise(req.body);

    const savedExecises = await newExecises.save()
    res.json(savedExecises);
});


// Get a specific Execise by ID 
router.get('/get/:id', isAuthenticated, async (req, res) => {
    const execise = await Execise.findById({ _id: req.params.id });

    res.json(execise);
});


//Delete a Execise
router.delete('/delete/:id', isAuthenticated, async (req, res) => {
    const execise = await Execise.findByIdAndDelete({ _id: req.params.id });

    res.json(execise);
});

//Update a Execise
router.patch('/update/:id', isAuthenticated, async (req, res) => {
    const execise = await Execise.updateOne({ _id: req.params.id}, { $set: req.body });

    res.json(execise);
});


router.get('/jwt', (req, res) => {
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    let token = jwt.sign({ "body": "stuff" }, privateKey, { algorithm: 'HS256'});
    res.send(token);
});


function isAuthenticated(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {

        let token = req.headers.authorization.split(" ")[1];
        
        let privateKey = fs.readFileSync('./private.pem', 'utf8');

        jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
            
            // if there has been an error...
            if (err) {  
                // shut them out!
                res.status(500).json({ error: "Not Authorized" });
                throw new Error("Not Authorized");
            }
            // if the JWT is valid, allow them to hit
            // the intended endpoint
            return next();
        });
    } else {
        res.status(500).json({ error: "Not Authorized" });
        throw new Error("Not Authorized");
    }
}



module.exports = router;
