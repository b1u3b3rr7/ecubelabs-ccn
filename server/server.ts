const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const mongoose = require('mongoose');
const Flex = require('./models/Flex');
const api = require('./routes/index');

const app = express();
const port = 5000;

mongoose.connect('mongodb://127.0.0.1:27017/ecubelabs-ccn', {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("[+] Database connection established successfully.");
});

// app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);

app.listen(port, function() {
    console.log("[+] Express server is running on port " + port + ".");
});