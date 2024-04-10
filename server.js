// Require dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const exp = require('constants');
const { error } = require('console');

const app = express();

const PORT = 3001;

// Middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Sends users to correct pages
// directs user to the index.html page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

// directs user to the notes.html page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

// send json of all notes if user accesses ./api/notes
app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (error, notes) =>{
        if (error) {
            return console.log(error)
        }
        res.json(JSON.parse(notes))
    })
});

// Need to use POST in otder to take user input into backend (db.json)
app.post("/api/notes", (req, res) => {
    const note = req.body;
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (error, notes) => {
        if (error) {
            return console.log(error);
        }
    notes = JSON.parse(notes)
    if (notes.length > 0) {
        let lastNote = notes[notes.length - 1].id
        var id = parseInt(lastId) + 1
    } else {
        var id = 10;
    }

    // Creates a new note object for html
    let newNote = {
        title: note.title,
        text: note.text,
        id: id
    }

    // Needs to merge the new note and put it in an array
    var notesArr = notes.concat(newNote)

    // Writes the user input into the db.json file so users will be able to return it.
    fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(notesArr), (error, data) => {
        if (error) {
            return error
        }
        console.log(noteArr)
        res.json(notesArr);
    })
    });
});

// Delete chose note using the method within
app.delete("/api/notes/:id", (req, res) => {
    let deleteNote = JSON.parse(req.params.id);
    console.log(deleteNote, "Deleted!");
    // need the info from database to run loop to remove note
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (error, notes) => {
        if (error) {
            return console.log(error)
        }
        // existing notes array from the read file
        let noteArr = JSON.parse(notes);

        // actual loop function to remove notes based off matching info
        for (var i = 0; i<noteArr.length; i++) {
            if(deleteNote == noteArr[i].id) {
                noteArr.splice(i,1);

                // Writes new array into the db.json file based off deleted notes
                fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(noteArr), (error, data) => {
                    if (error) {
                        return error
                    }
                })
            }
        }
    });
});

// initialize port listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));