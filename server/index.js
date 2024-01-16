const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(8888, () => console.log('Server is listening on port 8888'));
