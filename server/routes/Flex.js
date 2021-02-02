const express = require('express');
const Flex = require('../models/Flex');

const router = express.Router();

// get flexes data
router.get('/', (req, res) => {
    Flex.find(function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.json(docs);
        }
    });
});

// send a flex data
router.post('/', (req, res) => {
    let name = req.body.name;
    Flex.findOne({ name: new RegExp('^' + name + '$', "i") }, (err, doc) => {
        if (!doc) {
            // replace undefined by new flex
            doc = new Flex({ name: req.body.name });
        }

        // update flex
        doc.data.push(
            {
                date: req.body.date,
                fillLevel: req.body.fillLevel
            }
        );

        // save flex
        doc.save()
            .then(doc => {
                res.status(200).json("Flex data updated.");
            })
            .catch(err => {
                res.status(400).send("Failed to update flex data.");
            });
    });
});

module.exports = router;