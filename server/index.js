require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');
const { auth } = require('./middlewares/authMiddleware');

const app = express();

const PORT = process.env.PORT || 8888;

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected'))
    .catch(error => console.log(error));

    app.use(cors(
        {
        origin: ['https://nexus-tunes.vercel.app'],
        methods: ['POST', 'GET', 'PUT'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin']
    }
    ));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(auth);

app.get('/', (req, res) => {
    res.send('RESTful service');
});

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));