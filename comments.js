// Create web server
// 1. Import express module
const express = require('express');
const app = express();

// 2. Create a web server
app.get('/', (req, res) => {
    res.send('Hello, world');
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
