const express = require("express");
const app = express();
const notes = require("./notesRouter");
const cors = require('cors');
app.use(cors());

// routes
app.use("/notes", notes);

app.use((req, res, next) => {
  res.status(404).send("404 - Page not found");
});

// listen to port
app.listen(3001, '0.0.0.0', () => {
        console.log("listening for requests on port", 3001);
});