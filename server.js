// Require dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const PORT = 3001;

// Sends users to correct pages
// directs user to the index.html page
app.get(" / ", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

// directs user to the notes.html page
app.get(" / ", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

// initialize port listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));