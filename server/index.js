const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('RESTful service');
});

app.use(routes);

app.listen(8888, () => console.log('Server is listening on port 8888'));