const express = require('express');

const app = express();
const PORT = 5000;

let count = 0;

app.get('/', (req, res) => {
    count++;
    res.send(`Hey buoy!! This page visited ${count} times`);
});

app.listen(PORT, () => console.log('Server running on port', PORT));
