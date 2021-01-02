const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const database = require('./db.config');


mongoose.connect(
    database.url
    )
    .then(() => {
        console.log('Connected to database :)');
    })
    .catch(err => {
        console.log("Cannot connect to database :(", err);
        process.exit();
    });

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to this todo app.'});
});

require("./routes/todo.routes")(app);
// const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server is running at http://localhost:${port}');
});


