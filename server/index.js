const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require('./routes');
const { auth } = require('./middlewares/authMiddleware');

const app = express();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('DB connected'))
    .catch(error => console.log(error));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(auth);

app.get('/', (req, res) => {
    res.send('RESTful service');
});

app.use(routes);

app.listen(8888, () => console.log('Server is listening on port 8888'));