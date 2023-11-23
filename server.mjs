// installing express is always locally on the current project

// Environment Setup:
// npm install express
// npm install sqlite3
// npm install cors

// make sure no other batch job are running
// at the end type on the terminal :> npm start

import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// here use the name of the database 
const dbPath = path.resolve(__dirname, 'user_database');

// database conneection with handling error
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// app object: allows to interact with the database: online and locally
const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add an API endpoint to retrieve user data from the database
app.get('/users', (req, res) => {
    // any collected value goes inside the empty array []
    db.all(`SELECT * FROM Users`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error retrieving users from database');
        } else {
            res.status(200).json(rows);
        }
    });
});

// user creates and send data in the database (writing a record)
// '/addUser' is the endpoint
app.post('/addUser', (req, res) => {
    // username and email are provided by the form in the HTML file
    const { username, email } = req.body;
    // [username, email] arrive form the HTML file
    // (username, email) are the columns in the database
    db.run(`INSERT INTO Users (username, email) VALUES (?, ?)`, [username, email], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error inserting user into database');
        } else {
            console.log(`A new user has been added with ID: ${this.lastID}`);
            res.status(200).send('User added successfully');
        }
    });
});

// better not to change the port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
