const express = require('express');
const router = express.Router();

//Models
const Director = require('../models/Director');

router.get('/', (req,res) => {
   res.json({title:'Express'});
});

router.post('/add', (req,res,next) => {
    const director = new Director(req.body);
    const promise = director.save();

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

module.exports = router;