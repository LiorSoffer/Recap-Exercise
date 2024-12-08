const express = require("express");
const app = express();
const notes = require("./notesRouter");
const cors = require('cors');
require('dotenv').config();

// env variable
const port = process.env.PORT 

app.use(cors());

// routes
app.use("/notes", notes);

app.use((req, res, next) => {
  res.status(404).send("404 - Page not found");
});

// start the server
app.listen(port, '0.0.0.0', () => {
        console.log(`listening for requests on port, ${port}`);
});