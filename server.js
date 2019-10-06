const express = require('express');
const connectToDB = require('./config/db');

const app = express();

// Connect to Database
connectToDB();

app.get('/', (req, res) => res.send('API is now running...'));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});
