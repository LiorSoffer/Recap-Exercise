const express = require('express');
const path = require('path');
const axios = require('axios'); // Add axios for HTTP requests
const app = express();
require('dotenv').config();

// env variable
const port = process.env.PORT;
const serverUrl = process.env.SERVER_URL;

// Middleware to parse JSON requests
app.use(express.json());

// fetch data from another service
app.get('/hi', async (req, res) => {
  try {
    const response = await axios.get(serverUrl);
    res.status(200).json(response.data); // Return the data received from the service
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from express-service' });
  }
});

// app.get('/hi2', async (req, res) => {
//     res.status(200).json( {key: 'cool'} );
  
// });

// Serve the index.html file at the /gui route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
