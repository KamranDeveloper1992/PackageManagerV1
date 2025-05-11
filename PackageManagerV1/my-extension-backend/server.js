// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // CORS (Cross-Origin Resource Sharing) icazələrini açır

// API endpoint
app.get('/data', (req, res) => {
  res.json({ message: 'Node.js server working!' });
});

app.listen(3000, () => {
  console.log('Node.js server is running on http://localhost:3000');
});
