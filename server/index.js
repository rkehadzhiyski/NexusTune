const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');
const { auth } = require('./middlewares/authMiddleware');

const app = express();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('DB connected'))
    .catch(error => console.log(error));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: ['https://nexus-tune.vercel.app/'],
    methods: ['POST', 'PUT', 'GET'],
    creadentials: true
}));
app.use(auth);

app.get('/', (req, res) => {
    res.send('RESTful service');
});

app.use(routes);

app.listen(8888, () => console.log('Server is listening on port 8888'));