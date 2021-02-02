const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Flex = new Schema({
    name: {   // flex name
        type: String
    },
    data: [ // saved fill-level data
        new Schema({
            date: {
                type: Date,
                default: Date.now
            },
            fillLevel: {
                type: Number
            }
        })
    ]
});

module.exports = mongoose.model('flex', Flex);