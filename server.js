const express = require('express');
const fs = require('fs');
const app = express();
// const morgan = require('morgan');
require('dotenv').config();

const { petsSchema } = require('./schemas/petsSchema');

// const usersRoutes = require('./routes/usersRoutes')
const petsRoutes = require('./routes/petsRoutes')
const usersRoutes = require('./routes/usersRoutes')
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 8080;

const dbConnection = require('./knex/knex');

app.use(express.json());

app.use('/users', usersRoutes);
// app.use('/user', usersRoutes);
app.use('/pets', petsRoutes);

dbConnection.migrate.latest().then((migration) => {
    if (migration) {
        console.log('Connected to DB', migration);
        app.listen(PORT, () => {
            console.log(`Listening on ${PORT}`);
        });
    }
});