const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_data'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    var sql = "CREATE TABLE IF NOT EXISTS user (username VARCHAR(255))";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
    console.log('Connected to database');
});

global.db = db;

const port = 5000;

app.set('port', process.env.port || port); // set express to use this port
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(express.static(path.join(__dirname, 'FrontEnd/build')))

app.get('/adduser', function (req, res, next) {
    let sql = `INSERT INTO user(username)
           VALUES (?)`;
    db.query(sql, `${req.query.username}`, function (err, result) {
        if (err) throw err;
        res.json({ status: 'success', message: 'user is successfully created' })
    });
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'FrontEnd/build', 'index.html'))
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
